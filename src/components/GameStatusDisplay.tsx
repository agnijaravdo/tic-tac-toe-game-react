import React from "react";
import Confetti from "react-confetti";
import { GameStatus } from "../types/types";

type GameStatusDisplayParams = {
  gameStatus: GameStatus;
  playerName: string;
};

const GameStatusDisplay = ({
  gameStatus,
  playerName,
}: GameStatusDisplayParams) => {
  return (
    <div className="text-center mt-4">
      {gameStatus === GameStatus.Winner ? (
        <>
          <h2 className="winner text-success">
            Player {playerName} is a winner!
          </h2>
          <Confetti />
        </>
      ) : (
        ""
      )}
      {gameStatus === GameStatus.Draw ? (
        <h2 className="draw text-warning">
          No winner! It's a draw!
        </h2>
      ) : (
        ""
      )}
      {gameStatus === GameStatus.InProgress ? (
        <h2 className="status text-info">
          Game is in progress!
        </h2>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameStatusDisplay;
