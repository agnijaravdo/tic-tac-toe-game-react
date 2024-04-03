import React from "react";
import Confetti from "react-confetti";

type GameStatusParams = {
  isWinner: boolean;
  isDraw: boolean;
  isReplay: boolean;
  playerName: string;
};

const GameStatus = ({
  isWinner,
  isDraw,
  isReplay,
  playerName,
}: GameStatusParams) => {
  return (
    <div className="text-center mt-4">
      {isWinner && !isReplay ? (
        <>
          <h2 className="winner text-success">
            Player {playerName} is a winner!
          </h2>
          <Confetti />
        </>
      ) : (
        ""
      )}
      {isDraw ? (
        <h2 className="draw text-warning">
          No winner! It's a draw!
        </h2>
      ) : (
        ""
      )}
      {!isWinner && !isDraw ? (
        <h2 className="status text-info">
          Game is in progress!
        </h2>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameStatus;
