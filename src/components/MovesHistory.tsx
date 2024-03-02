import React from "react";
import { HistoryEntry } from "../types/types";

type MovesHistoryParams = {
  move: HistoryEntry;
  index: number;
};

const MovesHistory = ({
  move: [name, symbol, rowIndex, columnIndex],
  index,
}: MovesHistoryParams) => {
  return (
    <div>
      {`${index + 1}. Player ${
        index % 2 === 0 ? 1 : 2
      }: ${name} placed ${symbol} on (${rowIndex},${columnIndex})`}
    </div>
  );
};

export default MovesHistory;
