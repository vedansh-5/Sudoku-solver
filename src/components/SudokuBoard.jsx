import { useEffect, useState } from 'react'

const SudokuBoard = ({ grid, steps, onCellChange }) => {
  const [currentGrid, setCurrentGrid] = useState(grid)
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedCell, setSelectedCell] = useState(null)

  useEffect(() => {
    setCurrentGrid(grid)
  }, [grid])

  useEffect(() => {
    if (steps.length > 0 && stepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCurrentGrid(steps[stepIndex])
        setStepIndex(stepIndex + 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [steps, stepIndex])

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col })
  }

  const handleKeyPress = (e) => {
    if (selectedCell && /^[1-9]$/.test(e.key)) {
      const newValue = parseInt(e.key)
      onCellChange(selectedCell.row, selectedCell.col, newValue)
    } else if (selectedCell && e.key === 'Backspace') {
      onCellChange(selectedCell.row, selectedCell.col, 0)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [selectedCell])

  return (
    <div className="sudoku-board">
      {currentGrid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div 
              key={`${i}-${j}`} 
              className={`cell ${cell !== 0 ? 'filled' : ''} ${
                selectedCell?.row === i && selectedCell?.col === j ? 'selected' : ''
              }`}
              onClick={() => handleCellClick(i, j)}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SudokuBoard
