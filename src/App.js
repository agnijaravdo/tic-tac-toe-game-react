import React, { useState } from "react";
import "./App.css";
import MovesHistory from "./components/MovesHistory";
import GameStatus from "./components/GameStatus";

function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [player, setPlayer] = useState("0");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [movesHistory, setMovesHistory] = useState([]);
  const [board, setBoard] = useState(() => {
    const row = new Array(boardSize).fill(null);

    let board = [];

    for (let i = 0; i < boardSize; i++) {
      board.push([...row]);
    }

    return board;
  });

  function selectCell(rowIndex, columnIndex) {
    if (!board[rowIndex][columnIndex] && !isWinner) {
      setMovesHistory([
        ...movesHistory,
        [player === "X" ? "0" : "X", rowIndex, columnIndex],
      ]);
      setSelectedRow(rowIndex);
      setSelectedColumn(columnIndex);
      let nextPlayer = player === "X" ? "0" : "X";
      setPlayer(nextPlayer);
      const boardCopy = [...board];
      boardCopy[rowIndex][columnIndex] = nextPlayer;
      setBoard(boardCopy);
      checkWinnerOrDraw(rowIndex, columnIndex, nextPlayer);
    }
  }

  function checkWinnerOrDraw(nextRow, nextColumn, nextPlayer) {
    let verticalWin = true;
    let horizontalWin = true;
    let diagonalWin = true;
    let antidiagonalWin = true;

    if (nextRow == null || nextColumn == null) {
      return;
    }

    for (let i = 0; i < boardSize; i++) {
      if (board[i][nextColumn] !== nextPlayer) {
        verticalWin = false;
      }
      if (board[nextRow][i] !== nextPlayer) {
        horizontalWin = false;
      }
      if (board[i][i] !== nextPlayer) {
        diagonalWin = false;
      }
      if (board[i][boardSize - i - 1] !== nextPlayer) {
        antidiagonalWin = false;
      }
    }

    if (verticalWin || horizontalWin || diagonalWin || antidiagonalWin) {
      setIsWinner(true);
    } else {
      checkDraw();
    }
  }

  function checkDraw() {
    let draw = true;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === null) {
          draw = false;
        }
      }
    }
    setIsDraw(draw);
  }

  function resetGame(size = 3) {
    setBoardSize(size);
    setPlayer("0");
    setSelectedRow(null);
    setSelectedColumn(null);
    setIsWinner(false);
    setIsDraw(false);
    resetBoard(size);
    setMovesHistory([]);
  }

  function resetBoard(size) {
    const row = new Array(size).fill(null);

    let board = [];

    for (let i = 0; i < size; i++) {
      board.push([...row]);
    }

    setBoard(board);
  }

  function setNewBoardSize(size) {
    resetGame(size);
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <GameStatus
        player={player}
        isWinner={isWinner}
        isDraw={isDraw}
      />
      <h2>Selected Row: {selectedRow}</h2>
      <h2>Selected Column: {selectedColumn}</h2>
      <h2>
        Board Size: {boardSize}x{boardSize}
      </h2>
      <hr />
      <div>
        Choose Board Size
        <div>
          <button
            className={`${boardSize === 3 ? "selectedButton" : ""}`}
            onClick={() => setNewBoardSize(3)}
          >
            3x3
          </button>
          <button
            className={`${boardSize === 4 ? "selectedButton" : ""}`}
            onClick={() => setNewBoardSize(4)}
          >
            4x4
          </button>
          <button
            className={`${boardSize === 5 ? "selectedButton" : ""}`}
            onClick={() => setNewBoardSize(5)}
          >
            5x5
          </button>
        </div>
      </div>
      <br />
      <div>Start new game</div>
      <button onClick={() => resetGame(boardSize)}>Reset Game</button>
      <br />
      <br />
      <div>
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
          >
            {row.map((column, columnIndex) => (
              <div
                onClick={() => {
                  selectCell(rowIndex, columnIndex);
                }}
                style={{ cursor: "pointer" }}
                key={columnIndex}
                className="column"
              >
                {board[rowIndex][columnIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <br />
      <div>
        <h2>Moves History</h2>
        <div>
          {movesHistory.map((move, index) => (
            <MovesHistory
              key={`${move[1]}-${index}`}
              move={move}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
