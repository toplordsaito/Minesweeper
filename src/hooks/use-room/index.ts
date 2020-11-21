import { useEffect, useState } from 'react'

import { db } from '../../services'

interface Output {
  isFetching: boolean
  room?: Object
}

const useRoom = (roomId): Output => {
  // const { roomId } = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [room, setRoom] = useState<Object | undefined>()

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        if (doc.exists) setRoom({ ...doc.data(), id: doc.id })
        else console.log('Room Not Found')
        if (isFetching) setIsFetching(false)
      })

    return () => {
      unsubscribe()
    }
  }, [roomId, isFetching])

  return { isFetching, room }
}

export default useRoom
