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
    <div className="card mb-3" style={{ width: "320px" }}>
      <div className="card-header text-center">Player {symbol}</div>
      <div className="card-body" style={{ minHeight: "72px" }}>
        <div className="row align-items-center">
          {isEditing ? (
            <>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter player name"
                  onChange={(event) => onNameChange(symbol, event.target.value)}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-success" onClick={handleOnClick}>
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col">
                <span className="player-name">{name}</span>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" onClick={handleOnClick}>
                  Edit Name
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
