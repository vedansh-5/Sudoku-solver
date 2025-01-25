import { useState } from 'react'
import './App.css'
import ImageUpload from './components/ImageUpload'
import SudokuBoard from './components/SudokuBoard'
import SudokuControls from './components/SudokuControls'
import { generateSudoku, solve } from './utils/sudoku'  // Add this import

function App() {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill(0)))
  const [solving, setSolving] = useState(false)
  const [steps, setSteps] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const generateRandomPuzzle = () => {
    // Generate a random valid Sudoku puzzle
    const newGrid = generateSudoku()
    setGrid(newGrid)
    setSteps([])
  }

  const solveSudoku = () => {
    setSolving(true)
    const solution = solve(grid)
    setSteps(solution.steps)
    setGrid(solution.grid)
    setSolving(false)
  }

  const refreshPuzzle = () => {
    setGrid(Array(9).fill().map(() => Array(9).fill(0)))
    setSteps([])
    setSolving(false)
  }

  const instantSolve = () => {
    setSolving(true)
    const solution = solve(grid)
    setGrid(solution.grid)
    setSteps([])
    setSolving(false)
  }

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r])
    newGrid[row][col] = value
    setGrid(newGrid)
  }

  const handleImageError = (message) => {
    setErrorMessage(message)
  }

  return (
    <div className="app">
      <h1>Sudoku Solver</h1>
      <div className="app-container">
        <div className="left-panel">
          <ImageUpload setGrid={setGrid} onError={handleImageError} />
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
              <p className="hint-text">You can manually enter numbers by clicking cells and typing 1-9</p>
            </div>
          )}
        </div>
        <div className="right-panel">
          <SudokuControls 
            onGenerate={generateRandomPuzzle}
            onSolve={solveSudoku}
            onInstantSolve={instantSolve}
            onRefresh={refreshPuzzle}
            solving={solving}
          />
          <SudokuBoard 
            grid={grid} 
            steps={steps} 
            onCellChange={handleCellChange} 
          />
        </div>
      </div>
    </div>
  )
}

export default App
