// import logo from './logo.svg';
import { useEffect, useState } from "react"
import './App.css';

function App() {
  const startBoard = [
    [9, 1, 3, 4],
    [9, 2, 3, 4],
    [1, 5, 6, 2],
    [5, 6, 8, 8]
  ]
  const [revealValue, setRevealValue] = useState([]) // startBoard values
  const [pairValue, setPairValue] = useState([]) // pair values that were found
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  const revealTile = (row, col) => {
    const newBoard = [...board]

    if (revealValue.length === 2) {

      const newPairValues = [...pairValue]
      if (revealValue[0] === revealValue[1]) {
        newPairValues.push(revealValue[0])
        setPairValue(newPairValues)
      } 
              
      for (let i = 0; i < newBoard.length ; i++) {
        for (let j = 0; j < newBoard[i].length; j++) {
          let add = true
          console.log(pairValue)
          for (let b = 0; b < pairValue.length; b++) {
            if (newBoard[i][j] === pairValue[b]) {
              add = false
            }
          }
          console.log(add)
          if (add) {
            newBoard[i][j] = 0
          }
        }
      }

      setRevealValue([])
    }
    
    let add = true;
    for(let i = 0; i < pairValue.length; i++) {
      if (newBoard[row][col] === pairValue[i]) {
        add = false
      }
    }

    let newRevealValues = []
    if (revealValue.length === 2) {
      newRevealValues = [startBoard[row][col]]
    } else {
      newRevealValues = [...revealValue, startBoard[row][col]]
    }

    if(add) {
      newBoard[row][col] = startBoard[row][col]
      setRevealValue(newRevealValues)
    }
  
    setBoard(newBoard)
  } 

  console.log(revealValue)

  return (
    <div className="App">
      {board.map((row, rowIndex) => (
        <div className="board" key={rowIndex}>
          {row.map((value, colIndex) => (
            <Tile key={colIndex} value={value} colIndex={colIndex} rowIndex={rowIndex} revealTile={revealTile} />
          ))}
        </div>
      ))}
    </div>
  );
}


function Tile({rowIndex, colIndex, value, revealTile}) {
  if (value === 0) {
    return <button className="tile" onClick={() => revealTile(rowIndex, colIndex)}></button>
  } else {
    return <button className="tile" onClick={() => revealTile(rowIndex, colIndex)}>{value}</button>
  }
}


export default App;
