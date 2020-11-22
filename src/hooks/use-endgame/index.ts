import { useState } from 'react'

import { db } from '../../services'
import { useCurrentUser } from '../../hooks'
interface Output {
    isEndgame: boolean
    endGame: (roomId: string) => void
}

const useEndgame = (): Output => {
    const user = useCurrentUser()
    // const user = { id: "user" + Math.floor(Math.random() * 1000) }
    const [isEndgame, setIsEndgame] = useState(false)

    async function endGame(roomId: string) {
        console.log("endgameing . . . . . . . .. . . . . . .")
        setIsEndgame(true)
        try {
            const doc = await db.collection('result').doc(roomId).get()
            if (doc.exists) {
                const data = doc.data()
                let result = data?.result
                result.push({
                    ...user,
                    status: "completed",
                })
                await db
                    .collection('result')
                    .doc(roomId)
                    .update({
                        state: "end",
                        result: result,
                    })

                await db
                    .collection('rooms')
                    .doc(roomId)
                    .update({
                        state: "waiting",
                    })
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsEndgame(false)
        }
    }

    return { isEndgame, endGame }
}

export default useEndgame
