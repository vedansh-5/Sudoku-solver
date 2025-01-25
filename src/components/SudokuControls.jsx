const SudokuControls = ({ onGenerate, onSolve, onInstantSolve, onRefresh, solving }) => {
  return (
    <div className="sudoku-controls">
      <button className="generate" onClick={onGenerate} disabled={solving}>
        Generate Random Puzzle
      </button>
      <button className="solve" onClick={onSolve} disabled={solving}>
        {solving ? 'Solving...' : 'Solve Step by Step'}
      </button>
      <button className="solve" onClick={onInstantSolve} disabled={solving}>
        Instant Solve
      </button>
      <button className="refresh" onClick={onRefresh} disabled={solving}>
        ↻ Reset
      </button>
    </div>
  )
}

export default SudokuControls
