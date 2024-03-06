import React from "react";
import { BoardSize } from "../types/types";

type BoardSizeSelectionParams = {
  boardSize: BoardSize;
  resetBoard: (boardSize: BoardSize) => void;
};

const BoardSizeSelection = ({
  boardSize,
  resetBoard,
}: BoardSizeSelectionParams) => {
  return (
    <div>
      <div className="text-center mb-3">
        <label
          htmlFor="boardSizeSelect"
          className="form-label d-block mb-2"
        >
          Choose Board Size
        </label>
        <div
          className="btn-group"
          role="group"
        >
          <button
            type="button"
            className={`btn ${
              boardSize === 3 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => resetBoard(3)}
          >
            3x3
          </button>
          <button
            type="button"
            className={`btn ${
              boardSize === 4 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => resetBoard(4)}
          >
            4x4
          </button>
          <button
            type="button"
            className={`btn ${
              boardSize === 5 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => resetBoard(5)}
          >
            5x5
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardSizeSelection;
