import React from "react";
import clsx from 'clsx';
import { PlayerType } from "../types/types";

type OpponentTypeSelectionParams = {
  playerType: PlayerType;
  onPlayerTypeButtonClick: (playerType: PlayerType) => void;
};

const playerTypes = Object.values(PlayerType);

const OpponentTypeSelection = ({
  playerType,
  onPlayerTypeButtonClick,
}: OpponentTypeSelectionParams) => {
  return (
    <div className="text-center mb-3">
      <label htmlFor="playerTypeSelect" className="form-label d-block mb-2">
        Choose Your Opponent Type
      </label>
      <div className="btn-group" role="group">
        {playerTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={clsx('btn', {
              'btn-primary': playerType === type,
              'btn-outline-primary': playerType !== type,
            })}
            onClick={() => onPlayerTypeButtonClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpponentTypeSelection;
