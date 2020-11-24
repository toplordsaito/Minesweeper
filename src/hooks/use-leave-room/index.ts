import { useState } from 'react'
import AsyncStorage from "@react-native-community/async-storage";
import { db } from '../../services'
import { useCurrentUser } from '../../hooks'
interface Output {
  isLeaving: boolean
  leaveRoom: () => void
}

const useLeavePosition = (roomId): Output => {
  // const { roomId } = useParams()

  const [isLeaving, setIsLeaving] = useState(false)
  async function leaveRoom() {
    let user = JSON.parse(await AsyncStorage.getItem("user"));
    setIsLeaving(true)
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        const data = doc.data()
        let players = data.players.filter(p => p.id != user.id)
        if (players.length == 0 && data.state == "waiting") {
          await db
            .collection('rooms')
            .doc(roomId)
            .delete()
            .then(() => console.log("delete room", roomId))
        } else {
          let owner = data.owner
          if (user.id == owner) {
            let index = Math.floor(Math.random() * players.length)
            owner = players[index].id
          }
          await db
            .collection('rooms')
            .doc(roomId)
            .update({
              players: players,
              owner: owner
            })
        }

      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLeaving(false)
    }
  }

  return { isLeaving, leaveRoom }
}

export default useLeavePosition
