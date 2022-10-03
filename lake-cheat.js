// Javascript program to count islands in boolean 2D matrix

// No of rows and columns
let ROW = 5,
  COL = 5;

// A function to check if a given cell (row, col) can
// be included in DFS
function isSafe(M, row, col, visited) {
  // row number is in range, column number is in range
  // and value is 1 and not yet visited
  return (
    row >= 0 &&
    row < ROW &&
    col >= 0 &&
    col < COL &&
    M[row][col] == 1 &&
    !visited[row][col]
  );
}

// A utility function to do DFS for a 2D boolean matrix.
// It only considers the 8 neighbors as adjacent vertices
function DFS(M, row, col, visited) {
  // These arrays are used to get row and column numbers
  // of 8 neighbors of a given cell
  let rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
  let colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];

  // Mark this cell as visited
  visited[row][col] = true;

  // Recur for all connected neighbours
  for (let k = 0; k < 8; ++k) {
    if (isSafe(M, row + rowNbr[k], col + colNbr[k], visited)) {
      DFS(M, row + rowNbr[k], col + colNbr[k], visited);
    }
  }
}

// The main function that returns count of islands in a given
// boolean 2D matrix
function countIslands(M) {
  // Make a bool array to mark visited cells.
  // Initially all cells are unvisited
  let visited = new Array(ROW);
  for (let i = 0; i < ROW; i++) {
    visited[i] = new Array(COL);
  }
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      visited[i][j] = false;
    }
  }
  // Initialize count as 0 and traverse through the all cells
  // of given matrix
  let count = 0;
  for (let i = 0; i < ROW; ++i) {
    for (let j = 0; j < COL; ++j) {
      if (M[i][j] == 1 && !visited[i][j]) {
        // value 1 is not
        // visited yet, then new island found, Visit all
        // cells in this island and increment island count
        DFS(M, i, j, visited);
        count++;
      }
    }
  }
  return count;
}

// Driver method
let M = [
  [1, 1, 0, 0, 0],
  [0, 1, 0, 0, 1],
  [1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1],
];

console.log(countIslands(M));

// This code is contributed by avanitrachhadiya2155
