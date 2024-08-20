class Square {
  constructor() {
    this.adjacencyList = [];
  }
}

class KnightMoves {
  static matrixOfAdjacencyLists;
  static generated = false;

  static generateMatrix() {
    const ROWS = 8;
    const COLS = 8;
    const arr = [];

    for (let i = 0; i < ROWS; i++) {
      arr[i] = [];
      for (let j = 0; j < COLS; j++) {
        arr[i][j] = new Square();
        arr[i][j].adjacencyList = getAdjacencyList(i, j);
      }
    }

    KnightMoves.matrixOfAdjacencyLists = arr;
    KnightMoves.generated = true;
  }
}

function getAdjacencyList(row, col) {
  const adjacencyList = [];

  // left and up
  if (col - 2 >= 0 && row + 1 <= 7) {
    adjacencyList.push([row + 1, col - 2]);
  }

  // up and left
  if (col - 1 >= 0 && row + 2 <= 7) {
    adjacencyList.push([row + 2, col - 1]);
  }

  // up and right
  if (col + 1 <= 7 && row + 2 <= 7) {
    adjacencyList.push([row + 2, col + 1]);
  }

  // right and up
  if (col + 2 <= 7 && row + 1 <= 7) {
    adjacencyList.push([row + 1, col + 2]);
  }

  // right and down
  if (col + 2 <= 7 && row - 1 >= 0) {
    adjacencyList.push([row - 1, col + 2]);
  }

  // down and right
  if (col + 1 <= 7 && row - 2 >= 0) {
    adjacencyList.push([row - 2, col + 1]);
  }

  // down and left
  if (col - 1 >= 0 && row - 2 >= 0) {
    adjacencyList.push([row - 2, col - 1]);
  }

  // left and down
  if (col - 2 >= 0 && row - 1 >= 0) {
    adjacencyList.push([row - 1, col - 2]);
  }

  return adjacencyList;
}

export function knightMoves(start, stop) {
  if (start === stop) {
    return [start];
  }
  if (!KnightMoves.generated) {
    KnightMoves.generateMatrix();
  }

  const [startRow, startCol] = start;

  let startSquare = KnightMoves.matrixOfAdjacencyLists[startRow][startCol];

  const queue = [];
  queue.push([startSquare, [start]]);

  while (queue.length > 0) {
    const [square, path] = queue.shift();
    for (let i = 0; i < square.adjacencyList.length; i++) {
      const currIndices = square.adjacencyList[i];
      if (currIndices[0] === stop[0] && currIndices[1] === stop[1]) {
        return [...path, currIndices];
      }
      const [row, col] = currIndices;
      const newSquare = KnightMoves.matrixOfAdjacencyLists[row][col];
      const newPath = [...path, currIndices];
      queue.push([newSquare, newPath]);
    }
  }
}
