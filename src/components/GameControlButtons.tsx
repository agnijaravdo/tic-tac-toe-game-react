import React, { MouseEvent } from "react";
import { BoardSize } from "../types/types";

type GameControlButtonsParams = {
  isWinner: boolean;
  isDraw: boolean;
  rematchGameWithSameSettings: () => void;
  resetGame: (size?: BoardSize) => void;
  onReplayButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;  
};

const GameControlButtons = ({
  isWinner,
  isDraw,
  rematchGameWithSameSettings,
  resetGame,
  onReplayButtonClick
}: GameControlButtonsParams) => {
  return (
    <div className="text-center">
      <button className="btn btn-primary m-2" onClick={() => resetGame()}>
        Reset Game
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={rematchGameWithSameSettings}
      >
        Rematch
      </button>
      {isWinner || isDraw ? (
        <button
          className="btn btn-primary m-2" onClick={onReplayButtonClick}>
          Replay
        </button>
      ) : null}
    </div>
  );
};

export default GameControlButtons;
