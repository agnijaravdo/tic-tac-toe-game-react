import React from "react";
import { BoardGrid } from "../types/types";

type BoardParams = {
  board: BoardGrid;
  selectCell: (rowIndex: number, columnIndex: number) => void;
};

const Board = ({ board, selectCell }: BoardParams) => {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="row"
        >
          {row.map((column, columnIndex) => (
            <div
              onClick={() => {
                selectCell(rowIndex, columnIndex);
              }}
              style={{ cursor: "pointer" }}
              key={columnIndex}
              className="column"
            >
              {board[rowIndex][columnIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
