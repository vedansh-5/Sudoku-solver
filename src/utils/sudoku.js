export const generateSudoku = () => {
  const grid = Array(9).fill().map(() => Array(9).fill(0))
  fillGrid(grid)
  return removeNumbers(grid)
}

export const solve = (grid) => {
  const steps = []
  const result = { solved: false, grid: [...grid], steps }
  solveSudoku(result.grid, steps)
  return result
}

function fillGrid(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, i, j, num)) {
            grid[i][j] = num
            if (fillGrid(grid)) {
              return true
            }
            grid[i][j] = 0
          }
        }
        return false
      }
    }
  }
  return true
}

function removeNumbers(grid) {
  const copy = grid.map(row => [...row])
  const cellsToRemove = 40 + Math.floor(Math.random() * 15)
  let removed = 0
  
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9)
    const col = Math.floor(Math.random() * 9)
    if (copy[row][col] !== 0) {
      copy[row][col] = 0
      removed++
    }
  }
  
  return copy
}

function solveSudoku(grid, steps) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, i, j, num)) {
            grid[i][j] = num
            steps.push(JSON.parse(JSON.stringify(grid)))
            if (solveSudoku(grid, steps)) return true
            grid[i][j] = 0
            steps.push(JSON.parse(JSON.stringify(grid)))
          }
        }
        return false
      }
    }
  }
  return true
}

function isValid(grid, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false
  }
  
  // Check 3x3 box
  const startRow = row - row % 3
  const startCol = col - col % 3
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false
    }
  }
  
  return true
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}
