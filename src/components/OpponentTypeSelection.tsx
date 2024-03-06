import React from "react";
import { PlayerType } from "../types/types";

type OpponentTypeSelectionParams = {
  playerType: PlayerType;
  setPlayerType: (playerType: PlayerType) => void;
};

const playerTypes = Object.values(PlayerType);

const OpponentTypeSelection = ({
  playerType,
  setPlayerType,
}: OpponentTypeSelectionParams) => {
  return (
    <div className="text-center mb-3">
      <label
        htmlFor="playerTypeSelect"
        className="form-label d-block mb-2"
      >
        Choose Your Opponent Type
      </label>
      <div
        className="btn-group"
        role="group"
      >
        {playerTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`btn ${
              playerType === type ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setPlayerType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpponentTypeSelection;
