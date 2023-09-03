import { useState } from 'react'
import './App.css'
import { TURNS, WINNER_COMBOS } from './constants.js'

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      <span className='square'>
        {children}
      </span>
    </div>
  )
}



function App() {

  const [ board, setBoard ] = useState(Array(9).fill(null))
  const [ turn, setTurn ] = useState(TURNS.X)
  const [ winner, setWinner ] = useState(null)

  const checkWinner = (boardToCheck) => {
      for(const combo of WINNER_COMBOS){
        const [ a, b, c ] = combo
        if(
          boardToCheck[a] && 
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
      }
      return null
    }

  const updateBoard = (index) => {
    
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner) setWinner(newWinner)
  }

  
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
              updateBoard={updateBoard}
              key={index}
              index={index}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App