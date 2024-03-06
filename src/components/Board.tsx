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
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "4em",
                  margin: "2px",
                }}
                key={columnIndex}
                className="d-flex justify-content-center align-items-center"
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
