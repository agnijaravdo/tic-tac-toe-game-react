import React from "react";
import { BoardGrid } from "../types/types";

type BoardParams = {
  board: BoardGrid;
  selectCell: (rowIndex: number, columnIndex: number) => void;
};

const Board = ({ board, selectCell }: BoardParams) => {
  return (
    <div className="pt-4">
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex justify-content-center">
            {row.map((column, columnIndex) => (
              <div
                onClick={() => selectCell(rowIndex, columnIndex)}
                key={columnIndex}
                className="board-grid d-flex justify-content-center align-items-center"
              >
                {board[rowIndex][columnIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
