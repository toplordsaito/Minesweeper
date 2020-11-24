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
        setIsEndgame(true)
        try {
            const doc = await db.collection('result').doc(roomId).get()
            if (doc.exists) {
                const data = doc.data()
                console.log("elo Cal1")

                let result = data?.result
                result.push({
                    ...user,
                    status: isVictory ? "completed" : "fail",
                })

                let players = []
                if (data.mode == "Ranking" && result.length == 2) {
                    
                    if (result[0].status == "completed") {
                        //p1 win
                        console.log("P1 Win")
                        players = await eloRanking(result[0].id, result[1].id, 1, 0)
                    } else if (result[1].status == "fail") {
                        //p2 win
                        console.log("P2 Win")
                        players = await eloRanking(result[0].id, result[1].id, 0, 1)
                    }
                }

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
                        players: players
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
