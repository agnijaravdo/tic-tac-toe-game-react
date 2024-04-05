import React, { MouseEvent } from "react";
import { BoardSize, GameStatus } from "../types/types";

type GameControlButtonsParams = {
  gameStatus: GameStatus;
  rematchGameWithSameSettings: () => void;
  resetGame: (size?: BoardSize) => void;
  onReplayButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;  
};

const GameControlButtons = ({
  gameStatus,
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
      { gameStatus !== GameStatus.InProgress ? (
        <button
          className="btn btn-primary m-2" onClick={onReplayButtonClick}>
          Replay
        </button> 
      ) : null }
    </div>
  );
};

export default GameControlButtons;
