import React from "react";

const Board = ({ board, selectCell }) => {
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
