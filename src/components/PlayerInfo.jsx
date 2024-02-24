import React, { useState } from "react";

const PlayerInfo = ({ name, symbol, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    if (isEditing) {
      onNameChange(symbol, name);
    }
  };

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <>
            <input
              type="text"
              value={name}
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
      <button onClick={handleOnClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default PlayerInfo;
