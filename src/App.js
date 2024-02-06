import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(3);
  const [player, setPlayer] = useState("0");

  useEffect(() => {
    const row = new Array(boardSize).fill(null);

    const tempBoard = [];

    for (let i = 0; i < boardSize; i++) {
      tempBoard.push([...row]);
    }
    setBoard(tempBoard);
  }, []);

  function handleOnClick(rowIndex, columnIndex) {
    console.log(`rowIndex ${rowIndex}, columnIndex ${columnIndex} `);
    if (!board[rowIndex][columnIndex]) {
      let nextPlayer = player === "X" ? "0" : "X";
      setPlayer(nextPlayer);
      const boardCopy = [...board];
      boardCopy[rowIndex][columnIndex] = nextPlayer;
      setBoard(boardCopy);
    }
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <div>
        {board.map((row, rowIndex) => (
          <div className="row">
            {row.map((column, columnIndex) => (
              <div
                onClick={() => {
                  handleOnClick(rowIndex, columnIndex);
                }}
                style={{ cursor: "pointer" }}
                className="column"
              >
                {board[rowIndex][columnIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <br />
      <div>PLAYER CLICKED ON: </div>
    </div>
  );
}

export default App;
