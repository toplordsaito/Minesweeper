import { useState } from 'react'

import { db } from '../../services'
import { useCurrentUser } from '../../hooks'
interface Output {
  isJoining: boolean
  joinRoom: (roomId: string) => void
}

const useJoinRoom = (): Output => {
  const user = useCurrentUser()
  // const user = { id: "user" + Math.floor(Math.random() * 1000) }
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
        if (data.mode == "Ranking" && data?.players.length >= 2){
          found = false
          return false
        }
        let players = data?.players
        players.push(user)
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
