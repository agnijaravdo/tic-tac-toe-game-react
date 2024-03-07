import { BoardGrid, BoardSize, CurrentPlayer } from "../types/types";
import { checkIsDraw, checkIsWinner } from "./checkGameStatus";

export function updateGameStatus(
  boardCopy: BoardGrid,
  rowIndex: number,
  columnIndex: number,
  nextPlayer: CurrentPlayer,
  boardSize: BoardSize
) {
  const isGameWinner = checkIsWinner({
    nextRow: rowIndex,
    nextColumn: columnIndex,
    nextPlayer,
    board: boardCopy,
    boardSize,
  });

  const isGameDraw = checkIsDraw({
    board: boardCopy,
    boardSize,
    isWinner: isGameWinner,
  });

  return { isGameWinner, isGameDraw };
}
