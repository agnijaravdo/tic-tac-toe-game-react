import React from "react";
import { HistoryEntry } from "../types/types";

type MovesHistoryProps = {
  moves: HistoryEntry[];
};

const MovesHistory = ({ moves }: MovesHistoryProps) => {
  return (
    <div>
      <div className="moves-history pt-4">
        {moves.map(([name, symbol, rowIndex, columnIndex], index) => (
          <div
            key={index}
            className="small mb-1"
          >
            <span className="text-muted">Move {index + 1}:</span>
            <span>{` ${name} placed ${symbol} on (${rowIndex},${columnIndex})`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovesHistory;
