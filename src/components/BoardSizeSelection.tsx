import React from "react";
import clsx from 'clsx';
import { BoardSize } from "../types/types";

type BoardSizeSelectionParams = {
  boardSize: BoardSize;
  resetBoard: (boardSize: BoardSize) => void;
};

function getBoardSizeSelectionButtonClass(currentSize: BoardSize, boardSize: BoardSize) {
  return clsx('btn', {
    'btn-primary': currentSize === boardSize,
    'btn-outline-primary': currentSize !== boardSize,
  });
}

const BOARD_SIZES: BoardSize[] = [3, 4, 5];

const BoardSizeSelection = ({
  boardSize,
  resetBoard,
}: BoardSizeSelectionParams) => {
  return (
    <div>
      <div className="text-center mb-3">
        <label htmlFor="boardSizeSelect" className="form-label d-block mb-2">
          Choose Board Size
        </label>
        <div className="btn-group" role="group">
          {BOARD_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              className={getBoardSizeSelectionButtonClass(size, boardSize)}
              onClick={() => resetBoard(size)}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardSizeSelection;
