import React, { useState } from "react";
import { CurrentPlayer } from "../types/types";

type PlayerInfoParams = {
  name: string;
  symbol: CurrentPlayer;
  onNameChange: (symbol: CurrentPlayer, newName: string) => void;
};

const PlayerInfo = ({ name, symbol, onNameChange }: PlayerInfoParams) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Player {symbol}</div>
      <div className="card-body d-flex justify-content-between align-items-center">
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter player name"
              onChange={(event) => onNameChange(symbol, event.target.value)}
            />
            <button
              className="btn btn-success ml-2"
              onClick={handleOnClick}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span className="player-name">{name}</span>
            <button
              className="btn btn-primary"
              onClick={handleOnClick}
            >
              Edit Name
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
