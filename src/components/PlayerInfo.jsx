import React, { useState } from "react";

const PlayerInfo = ({ name, symbol }) => {
  const [playerInfo, setPlayerInfo] = useState({ name, symbol });
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event) => {
    setPlayerInfo({ ...playerInfo, name: event.target.value });
  };

  const handleSymbolChange = (event) => {
    setPlayerInfo({ ...playerInfo, symbol: event.target.value });
  };

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
              value={playerInfo.name}
              onChange={handleNameChange}
            />
            <input
              type="text"
              value={playerInfo.symbol}
              onChange={handleSymbolChange}
            />
          </>
        ) : (
          <>
            <span className="player-name">{playerInfo.name}</span>
            <span>{playerInfo.symbol}</span>
          </>
        )}
      </span>
      <button onClick={handleOnClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default PlayerInfo;
