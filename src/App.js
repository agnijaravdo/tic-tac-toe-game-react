import React, { useState } from "react";
import "./App.css";
import MovesHistory from "./components/MovesHistory";
import GameStatus from "./components/GameStatus";
import PlayerInfo from "./components/PlayerInfo";
import Board from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [isNewGame, setIsNewGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("0");
  const [players, setPlayers] = useState({
    X: { name: "Player 1" },
    0: { name: "Player 2" },
  });
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
      let nextPlayer = currentPlayer === "X" ? "0" : "X";
      setMovesHistory([
        ...movesHistory,
        [players[nextPlayer].name, nextPlayer, rowIndex, columnIndex],
      ]);
      setSelectedRow(rowIndex);
      setSelectedColumn(columnIndex);
      setCurrentPlayer(nextPlayer);
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
    setCurrentPlayer("0");
    setPlayers({
      X: { name: "Player 1" },
      0: { name: "Player 2" },
    });
    setSelectedRow(null);
    setSelectedColumn(null);
    setIsWinner(false);
    setIsDraw(false);
    resetBoard(size);
    setMovesHistory([]);
    setIsNewGame((prevIsNewGame) => !prevIsNewGame);
  }

  function resetGameWithSameSettings() {
    setCurrentPlayer("0");
    setSelectedRow(null);
    setSelectedColumn(null);
    setIsWinner(false);
    setIsDraw(false);
    resetBoard(boardSize);
    setMovesHistory([]);
  }

  function resetBoard(size) {
    const row = new Array(size).fill(null);

    let board = [];

    for (let i = 0; i < size; i++) {
      board.push([...row]);
    }
    setBoardSize(size);
    setBoard(board);
  }

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: { ...prevPlayers[symbol], name: newName },
      };
    });
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe Game</h1>
      <div>
        Choose Board Size
        <div>
          <button
            className={`${boardSize === 3 ? "selectedButton" : ""}`}
            onClick={() => resetBoard(3)}
          >
            3x3
          </button>
          <button
            className={`${boardSize === 4 ? "selectedButton" : ""}`}
            onClick={() => resetBoard(4)}
          >
            4x4
          </button>
          <button
            className={`${boardSize === 5 ? "selectedButton" : ""}`}
            onClick={() => resetBoard(5)}
          >
            5x5
          </button>
        </div>
      </div>
      <div>
        <ol id="players">
          <h3>Player 1:</h3>
          <PlayerInfo
            name={players.X.name}
            symbol="X"
            onNameChange={handleNameChange}
          />
          <h3>Player 2:</h3>
          <PlayerInfo
            name={players["0"].name}
            symbol="0"
            onNameChange={handleNameChange}
          />
        </ol>
      </div>
      <button onClick={(e) => setIsNewGame(true)}>Start New Game</button>
      <hr />
      {isNewGame && (
        <div>
          <GameStatus
            isWinner={isWinner}
            isDraw={isDraw}
            playerName={players[currentPlayer].name}
          />
          <h2>
            Next Player: {players[currentPlayer === "X" ? "0" : "X"].name}
          </h2>
          <h2>Selected Row: {selectedRow}</h2>
          <h2>Selected Column: {selectedColumn}</h2>
          <h2>Current Turn: {movesHistory.length + 1}</h2>
          <h2>
            Board Size: {boardSize}x{boardSize}
          </h2>
          <br />
          <button onClick={() => resetGame(3)}>Reset Game</button>
          <br />
          <br />
          <button onClick={resetGameWithSameSettings}>Rematch</button>
          <br />
          <br />
          <Board
            board={board}
            selectCell={selectCell}
          />
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
      )}
    </div>
  );
}

export default App;
