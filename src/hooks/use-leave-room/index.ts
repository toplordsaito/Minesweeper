import { useState } from 'react'

import { db } from '../../services'
import { useCurrentUser } from '../../hooks'
interface Output {
  isLeaving: boolean
  leaveRoom: () => void
}

const useLeavePosition = (roomId): Output => {
  // const { roomId } = useParams()
  const user = useCurrentUser()
  const [isLeaving, setIsLeaving] = useState(false)

  console.log("---------------")
  console.log(user)
  async function leaveRoom() {
    setIsLeaving(true)
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        const data = doc.data()

        const index = data.players.findIndex(p => p.id == user.id)
        console.log(data.players)
        console.log(user)
        console.log(index)
        console.log(user.id)
        console.log(user.id == data.players[0].id)
        if (index != -1) {
          let players = data?.players
          players.pop(index)
          if (players.length == 0 && data.state == "waiting") {
            await db
              .collection('rooms')
              .doc(roomId)
              .delete()
              .then(() => console.log("delete room", roomId))
          } else {
            await db
              .collection('rooms')
              .doc(roomId)
              .update({
                players: players,
              })
          }
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
