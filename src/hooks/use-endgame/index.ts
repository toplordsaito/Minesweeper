import { useState } from 'react'

import { db } from '../../services'
import { useCurrentUser } from '../../hooks'
import { eloRanking } from '../../apis/userAPI'
interface Output {
    isEndgame: boolean
    endGame: (roomId: string, isVictory: boolean) => void
}

const useEndgame = (): Output => {
    const user = useCurrentUser()
    // const user = { id: "user" + Math.floor(Math.random() * 1000) }
    const [isEndgame, setIsEndgame] = useState(false)

    async function endGame(roomId: string, isVictory: boolean) {
        console.log("endgameing . . . . . . . .. . . . . . .")
        setIsEndgame(true)
        try {
            const doc = await db.collection('result').doc(roomId).get()
            const room = await db.collection('room').doc(roomId).get()
            if (doc.exists) {
                const data = doc.data()
                if (room.exists) {
                    const roomData = doc.data()
                    if (roomData.mode == "Ranking" && data.result.length == 2) {
                        const result = data.result
                        if (result[0].state == "completed") {
                            //p1 win
                            eloRanking(result[0].id, result[1].id, 1, 0)
                        } else if (result[1].state == "fail") {
                            //p2 win
                            eloRanking(result[0].id, result[1].id, 0, 1)
                        }
                    }
                }
                let result = data?.result
                result.push({
                    ...user,
                    status: isVictory ? "completed" : "fail",
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
