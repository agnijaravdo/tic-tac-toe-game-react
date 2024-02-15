const GameStatus = ({ player, isWinner, isDraw }) => {
  const nextPlayer = player === "X" ? "0" : "X";
  return (
    <div>
      {isWinner ? <h2 className="winner">Player {player} is a winner!</h2> : ""}
      {isDraw ? <h2 className="draw">No winner! It's a draw!</h2> : ""}
      {!isWinner && !isDraw ? (
        <h2 className="status">
          Game is in progress!
          <br />
          Player {player === "X" ? "0" : "X"} turn
          <br />
          Next player: {nextPlayer}
        </h2>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameStatus;
