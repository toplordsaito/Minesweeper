import { useState } from 'react'

import { db } from '../../services'

interface Output {
  isInitial: boolean
  initialGame: () => Object
}

const UseInitailGame = (roomId): Output => {
  // const { roomId } = useParams()
  const [isInitial, setIsInitial] = useState(false)

  async function initialGame() {
    setIsInitial(true)
    let mine;
    let isComplete = true
    try {
      const doc = await db.collection('rooms').doc(roomId).get()
      if (doc.exists) {
        const data = doc.data()
        if (data.mode == "Ranking" && data.players.length != 2) {
          alert("Error Can't start game mode ranking require 2 people")
          isComplete = false
          return false
        }

        mine = generateMine(data.mineSize, data.size)
        console.log(mine)
        await db
          .collection('rooms')
          .doc(roomId)
          .update({
            mine: mine,
            state: "playing",
          })


        await db
          .collection('result')
          .doc(roomId)
          .set({
            state: "playing",
            players: data.players,
            result: [],
            currentGoal: 0,
            mode: data.mode
          })


      }

    } catch (err) {
      console.error(err)
    } finally {
      setIsInitial(false)
      return isComplete
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