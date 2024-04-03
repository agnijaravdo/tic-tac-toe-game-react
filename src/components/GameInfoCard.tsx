import React from "react";
import { BoardSize, CurrentPlayer, Players } from "../types/types";

type GameInfoCardParams = {
  boardSize: BoardSize;
  nextPlayer: CurrentPlayer;
  players: Players;
};

const GameInfoCard = ({
  boardSize,
  nextPlayer,
  players,
}: GameInfoCardParams) => {
  return (
    <div className="pt-4">
      <div className="card card-custom-width">
        <div className="card-header text-center">Game Info</div>
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item">
            Current Turn: {players[nextPlayer].name} ({nextPlayer})
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
