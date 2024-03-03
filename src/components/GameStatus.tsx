import React from "react";
import Confetti from "react-confetti";

type GameStatusParams = {
  isWinner: boolean;
  isDraw: boolean;
  playerName: string;
};

const GameStatus = ({ isWinner, isDraw, playerName }: GameStatusParams) => {
  return (
    <div>
      {isWinner ? (
        <>
          <h2 className="winner">Player {playerName} is a winner!</h2>
          <Confetti />
        </>
      ) : (
        ""
      )}
      {isDraw ? <h2 className="draw">No winner! It's a draw!</h2> : ""}
      {!isWinner && !isDraw ? (
        <h2 className="status">Game is in progress!</h2>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameStatus;