import { BoardGrid, BoardSize } from "./types/types";

type CheckIsWinnerParams = {
  nextRow: number;
  nextColumn: number;
  nextPlayer: string;
  board: BoardGrid;
  boardSize: BoardSize;
}

type CheckIsDrawParams = {
  board: BoardGrid;
  boardSize: number;
  isWinner: boolean;
};


function checkIsWinner({ nextRow, nextColumn, nextPlayer, board, boardSize }: CheckIsWinnerParams): boolean {
  let verticalWin = true;
  let horizontalWin = true;
  let diagonalWin = true;
  let antidiagonalWin = true;

  if (nextRow == null || nextColumn == null) {
    return false;
  }

  for (let i = 0; i < boardSize; i++) {
    if (board[i][nextColumn] !== nextPlayer) {
      verticalWin = false;
    }
    if (board[nextRow][i] !== nextPlayer) {
      horizontalWin = false;
    }
    if (board[i][i] !== nextPlayer) {
      diagonalWin = false;
    }
    if (board[i][boardSize - i - 1] !== nextPlayer) {
      antidiagonalWin = false;
    }
  }

  if (verticalWin || horizontalWin || diagonalWin || antidiagonalWin) {
    return true;
  } else {
    return false;
  }
}

function checkIsDraw({ board, boardSize, isWinner }: CheckIsDrawParams): boolean {
  if (isWinner) return false;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === null) {
        return false;
      }
    }
  }
  return true;
}

export { checkIsWinner, checkIsDraw };
