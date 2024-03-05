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
    <li>
      <span className="player">
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Enter player name"
              onChange={(event) => onNameChange(symbol, event.target.value)}
            />
          </>
        ) : (
          <>
            <span className="player-name">{name}</span>
          </>
        )}
      </span>
      <button onClick={handleOnClick}>
        {isEditing ? "Save" : "Edit Name"}
      </button>
    </li>
  );
};

export default PlayerInfo;
