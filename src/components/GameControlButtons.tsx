import React from "react";
import { BoardSize } from "../types/types";

type GameControlButtonsParams = {
  resetGame: (boardSize?: BoardSize) => void;
  rematchGameWithSameSettings: () => void;
  isWinner: boolean;
  isDraw: boolean;
  setIsReplay: React.Dispatch<React.SetStateAction<boolean>>;
  setReplayIndex: React.Dispatch<React.SetStateAction<number>>;
};

const GameControlButtons = ({
  resetGame,
  rematchGameWithSameSettings,
  isWinner,
  isDraw,
  setIsReplay,
  setReplayIndex,
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
          className="btn btn-primary m-2"
          onClick={() => {
            setIsReplay(true);
            setReplayIndex(0);
          }}
        >
          Replay
        </button>
      ) : null}
    </div>
  );
};

export default GameControlButtons;
