import { useState } from 'react'

import { db } from '../../services'

interface Output {
  isInitial: boolean
  initialGame: () => void
}

const UseInitailGame = (roomId): Output => {
  // const { roomId } = useParams()
  const [isInitial, setIsInitial] = useState(false)

  async function initialGame() {
    setIsInitial(true)
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        const data = doc.data()
        let mine = generateMine(data.mineSize, data.size)
        console.log(mine)
        await db
          .collection('rooms')
          .doc(roomId)
          .update({
            mine,
          })

      }

    } catch (err) {
      console.error(err)
    } finally {
      setIsInitial(false)
    }
  }

  return { isInitial, initialGame }
}

export default UseInitailGame


const generateMine = (mine, BOARD_SIZE) => {
  let mineSet = new Set()
  while (mineSet.size != mine) {
    let row = Math.floor(Math.random() * BOARD_SIZE);
    let col = Math.floor(Math.random() * BOARD_SIZE);
    mineSet.add(posToString(col, row))
  }
  return Array.from(mineSet)
}

const posToString = (x, y) => {
  return x.toString() + "," + y.toString()
}