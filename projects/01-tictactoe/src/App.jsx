import { useState } from 'react'
import './App.css'
import { TURNS } from './constants.js'
import { Square } from './components/Square'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { checkEndGame } from './logic/board'


function App() {

  const [ board, setBoard ] = useState(Array(9).fill(null))
  const [ turn, setTurn ] = useState(TURNS.X)
  const [ winner, setWinner ] = useState(null)

  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  
  }

  const updateBoard = (index) => {
    
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) setWinner(newWinner)
    else if(checkEndGame(newBoard)){
    setWinner(false)
    }
  }

  
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> Reset del juego</button>
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

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  )
}

export default App
