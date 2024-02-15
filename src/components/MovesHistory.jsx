const MovesHistory = ({ move: [player, rowIndex, columnIndex], index }) => {
  return (
    <div>
      {`${index + 1}. Player ${
        index % 2 === 0 ? 1 : 2
      }: ${player} placed on (${rowIndex},${columnIndex})`}
    </div>
  );
};

export default MovesHistory;
