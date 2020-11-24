import { useState } from 'react'

import { useCurrentUser } from '../../hooks'
import { db } from '../../services'

function genId(): string {
  let result = ''
  const characters = '0123456789'
  for (let i = 0; i < 4; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  return result
}

interface Output {
  createRoom: (mode: String, size: number, bomb: number) => void
  isCreatingRoom: boolean
}

const useCreateRoom = (): Output => {

  const user = useCurrentUser()
  // console.log("user in room :"+JSON.stringify(user))
  // const user = { id: "user" + Math.floor(Math.random() * 1000) }
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)

  async function createRoom(mode: String, size: number, bomb: number): Promise<string | undefined> {
    if (!user) return undefined

    setIsCreatingRoom(true)
    let roomId: string | undefined
    // = user.roomId

    try {
      if (roomId) {
        const foundUserRoom = await db.collection('rooms').doc(roomId).get()
        if (foundUserRoom.exists) return roomId
      } else {
        let newIdGenerated = false
        roomId = genId()

        while (!newIdGenerated) {
          const foundRoom = await db.collection('rooms').doc(roomId).get()
          if (foundRoom.exists) roomId = genId()
          else newIdGenerated = true
        }

        // await db.collection('users').doc(user.id).update({ roomId })
      }

      // const startingTurn = Math.round(Math.random()) ? 'X' : 'O'
      await db
        .collection('rooms')
        .doc(roomId)
        .set({
          players: [user],
          state: "waiting",
          mode: mode,
          owner: user.id,
          mines: [],
          mineSize: bomb,
          size: size,
        })
    } catch (err) {
      console.error(err)
    } finally {
      setIsCreatingRoom(false)
      return roomId
    }
  }

  return { createRoom, isCreatingRoom }
}

export default useCreateRoom
