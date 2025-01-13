// gameOfLife.js

// Create a grid with random initial states
function createGrid(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random() > 0.7 ? 1 : 0)
    );
  }
  
  // Display the grid in the console
  function displayGrid(grid) {
    console.clear();
    console.log(grid.map(row => row.map(cell => (cell ? "⬛" : "⬜")).join(" ")).join("\n"));
  }
  
  // Get the number of alive neighbors for a cell
  function countAliveNeighbors(grid, x, y) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], /* cell */ [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
  
    return directions.reduce((count, [dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
  
      if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
        count += grid[newX][newY];
      }
  
      return count;
    }, 0);
  }
  
  // Compute the next generation of the grid
  function nextGeneration(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
  
    return grid.map((row, x) =>
      row.map((cell, y) => {
        const aliveNeighbors = countAliveNeighbors(grid, x, y);
  
        if (cell === 1) {
          // Any live cell with 2 or 3 live neighbors survives
          return aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
        } else {
          // Any dead cell with exactly 3 live neighbors becomes a live cell
          return aliveNeighbors === 3 ? 1 : 0;
        }
      })
    );
  }
  
  // Run the simulation
  function runSimulation(rows, cols, generations, interval = 500) {
    let grid = createGrid(rows, cols);
  
    let generation = 0;
    const intervalId = setInterval(() => {
      console.log(`Generation: ${generation++}`);
      displayGrid(grid);
      grid = nextGeneration(grid);
  
      if (generation >= generations) {
        clearInterval(intervalId);
        console.log("Simulation ended.");
      }
    }, interval);
  }
  
  // Run the game
  const rows = 20; // Number of rows
  const cols = 20; // Number of columns
  const generations = 50; // Number of generations
  runSimulation(rows, cols, generations);
  