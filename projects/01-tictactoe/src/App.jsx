import { useEffect, useState } from 'react'
import './App.css'
import { TURNS } from './constants.js'
import { Square } from './components/Square'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { checkEndGame } from './logic/board'
import { saveGameStorage, resetGameStorage } from './logic/storage/index.js'

function App() {

  const [ board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  })
  const [ turn, setTurn ] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [ winner, setWinner ] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameStorage(newBoard, newTurn)

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
          board.map((square, index) => {
            return (
              <Square
              updateBoard={updateBoard}
              key={index}
              index={index}
              >
                {square}
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
