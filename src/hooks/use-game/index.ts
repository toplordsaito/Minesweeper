import { useEffect, useState } from 'react'

import { db } from '../../services'

interface Output {
    isFetching: boolean
    game?: Object
}

const useGame = (roomId): Output => {
    // const { roomId } = useParams()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [game, setGame] = useState<Object | undefined>()

    useEffect(() => {
        const unsubscribe = db
            .collection('result')
            .doc(roomId)
            .onSnapshot((doc) => {
                if (doc.exists) setGame({ ...doc.data(), id: doc.id })
                else console.log('Room Not Found')
                if (isFetching) setIsFetching(false)
            })

        return () => {
            unsubscribe()
        }
    }, [roomId, isFetching])

    return { isFetching, game }
}

export default useGame
