import { useState } from 'react'

import { db } from '../../services'
import { useCurrentUser, useJoinRoom } from '../../hooks'
interface Output {
    isQuickJoining: boolean
    QuickjoinRoom: (mode: String) => void
}

const useQuickJoinRoom = (): Output => {
    const [isQuickJoining, setIsQuickJoining] = useState(false)
    const { joinRoom, isJoining } = useJoinRoom()
    async function QuickjoinRoom(mode: String) {
        // console.log("quick join mode", mode)
        setIsQuickJoining(true)
        let isFound = false
        let code = null
        try {
            const snapshot = await db.collection('rooms').where('mode', '==', mode).where('state', '==', "waiting").get()
            console.log(snapshot.size)
            let index = Math.floor(Math.random() * snapshot.size)
            let count = 0
            snapshot.forEach(doc => {
                // console.log(doc.id);
                if (count == index) {
                    code = doc.id
                    isFound = true
                }
                count += 1
            });
            if (isFound) {
                await joinRoom(code)
            }

        } catch (err) {
            console.error(err)
        } finally {
            setIsQuickJoining(false)
            return { isFound, code }
        }
    }

    return { isQuickJoining, QuickjoinRoom }
}

export default useQuickJoinRoom
