import React from "react";

const MovesHistory = ({
  move: [name, symbol, rowIndex, columnIndex],
  index,
}) => {
  return (
    <div>
      {`${index + 1}. Player ${
        index % 2 === 0 ? 1 : 2
      }: ${name} placed ${symbol} on (${rowIndex},${columnIndex})`}
    </div>
  );
};

export default MovesHistory;
