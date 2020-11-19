import { useState } from 'react'

import { db } from '../../services'
interface Output {
  isJoining: boolean
  joinRoom: (userId: string, roomId: string) => void
}

const useJoinRoom = (): Output => {
  // const user = useCurrentUser()
  const user = { id: "user" + Math.floor(Math.random() * 1000) }
  const [isJoining, setIsJoining] = useState(false)

  async function joinRoom(roomId: string) {
    setIsJoining(true)
    let found = false
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        found = true
        const data = doc.data()
        if (data?.players.indexOf(user.id) != -1)
          return alert(`You can't join the game more than once!`)
        let players = data?.players
        players.push(user.id)
        await db
          .collection('rooms')
          .doc(roomId)
          .update({
            players: players,
          })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsJoining(false)
      return found
    }
  }

  return { isJoining, joinRoom }
}

export default useJoinRoom
