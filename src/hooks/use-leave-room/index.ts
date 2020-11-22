import { useState } from 'react'

import { db } from '../../services'

interface Output {
  isLeaving: boolean
  leaveRoom: () => void
}

const useLeavePosition = (roomId): Output => {
  // const { roomId } = useParams()

  const [isLeaving, setIsLeaving] = useState(false)

  async function leaveRoom() {

    // const user = useCurrentUser()
    const doc = await db.collection('rooms').doc(roomId).get()
    let userId = null
    if (doc.exists) {
      const data = doc.data()
      userId = data.players[0]
    }


    setIsLeaving(true)
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        const data = doc.data()
        if (data?.players.indexOf(userId) != -1) {
          let players = data?.players
          players.pop(data?.players.indexOf(userId))
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
