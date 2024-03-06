import React from "react";
import { BoardSize, CurrentPlayer, Players } from "../types/types";

type GameInfoCardParams = {
  boardSize: BoardSize;
  currentPlayer: CurrentPlayer;
  players: Players;
};

const GameInfoCard = ({
  boardSize,
  currentPlayer,
  players,
}: GameInfoCardParams) => {
  return (
    <div className="pt-4">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-header text-center">Game Info</div>
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item">
            Next Turn: {players[currentPlayer === "0" ? "X" : "0"].name}
          </li>
          <li className="list-group-item ">
            Board Size: {boardSize}x{boardSize}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GameInfoCard;
