import React, { useEffect, useState } from "react";
import "./App.css";
import MovesHistory from "./components/MovesHistory";
import GameStatus from "./components/GameStatus";
import PlayerInfo from "./components/PlayerInfo";
import Board from "./components/Board";
import { checkIsDraw, checkIsWinner } from "./utils";
import {
  BoardGrid,
  BoardSize,
  CurrentPlayer,
  HistoryEntry,
} from "./types/types";

enum PlayerType {
  Human = "Human",
  AI = "AI",
}

const playerTypes = Object.values(PlayerType);
type Players = {
  X: { name: string };
  0: { name: string };
};

function App() {
  const [boardSize, setBoardSize] = useState<BoardSize>(3);
  const [playerType, setPlayerType] = useState<PlayerType>(PlayerType.Human);
  const [isNewGame, setIsNewGame] = useState(false);
  const [isManualSelectionCompleted, setIsManualSelectionCompleted] =
    useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>("0");
  const [players, setPlayers] = useState<Players>({
    X: { name: "Player 1" },
    0: { name: "Player 2" },
  });
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [boardHistory, setBoardHistory] = useState<BoardGrid[]>(() => {
    const row = new Array(boardSize).fill(null);

    let board: BoardGrid = [];

    for (let i = 0; i < boardSize; i++) {
      board.push([...row]);
    }

    return [board];
  });
  const [movesHistory, setMovesHistory] = useState<HistoryEntry[]>([]);
  const [replayIndex, setReplayIndex] = useState(0);
  const [board, setBoard] = useState<BoardGrid>(() => {
    const row = new Array(boardSize).fill(null);

    let board: BoardGrid = [];

    for (let i = 0; i < boardSize; i++) {
      board.push([...row]);
    }

    return board;
  });

  useEffect(() => {
    function selectCellRandomly(isGameWinner: boolean, isGameDraw: boolean) {
      if (playerType === PlayerType.AI && !isGameWinner && !isGameDraw) {
        let availableCells: any[] = [];
        for (let i = 0; i < boardSize; i++) {
          for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === null) {
              availableCells.push([i, j]);
            }
          }
        }
        if (availableCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableCells.length);
          const [randomRow, randomColumn] = availableCells[randomIndex];

          const boardCopy = structuredClone(board);
          boardCopy[randomRow][randomColumn] = "0";
          setBoard(boardCopy);
          setBoardHistory((prevBoardHistory) => [
            ...prevBoardHistory,
            boardCopy,
          ]);

          setMovesHistory((prevMovesHistory) => [
            ...prevMovesHistory,
            [players["0"].name, "0", randomRow, randomColumn],
          ]);

          const isGameWinner = checkIsWinner({
            nextRow: randomRow,
            nextColumn: randomColumn,
            nextPlayer: "0",
            board: boardCopy,
            boardSize,
          });
          const isGameDraw = checkIsDraw({
            board: boardCopy,
            boardSize,
            isWinner: isGameWinner,
          });
          setIsWinner(isGameWinner);
          setIsDraw(isGameDraw);
          setCurrentPlayer("0");
        }
      }
    }

    let timeoutId: number | NodeJS.Timeout;

    if (isManualSelectionCompleted && playerType === PlayerType.AI) {
      timeoutId = setTimeout(() => {
        selectCellRandomly(isWinner, isDraw);
        setIsManualSelectionCompleted(false);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    board,
    boardSize,
    isDraw,
    isManualSelectionCompleted,
    isWinner,
    playerType,
    players,
  ]);

  useEffect(() => {
    let timeoutId: number | NodeJS.Timeout;

    if (isReplay) {
      timeoutId = setTimeout(() => {
        const currentBoard = boardHistory[replayIndex];
        if (currentBoard) {
          setBoard(currentBoard);
          setReplayIndex((prevReplayIndex) => prevReplayIndex + 1);
        }
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [boardHistory, replayIndex, isReplay]);

  function selectCellManually(rowIndex: number, columnIndex: number) {
    if (isReplay) return; // preventing cell selection when replay is hapenning
    if (isManualSelectionCompleted && playerType === PlayerType.AI) return; // preventing cell selection when is AI move
    if (!board[rowIndex][columnIndex] && !isWinner) {
      const nextPlayer = currentPlayer === "X" ? "0" : "X";
      setMovesHistory((prevMovesHistory) => [
        ...prevMovesHistory,
        [players[nextPlayer].name, nextPlayer, rowIndex, columnIndex],
      ]);
      setSelectedRow(rowIndex);
      setSelectedColumn(columnIndex);
      setCurrentPlayer(nextPlayer);
      const boardCopy = structuredClone(board);
      boardCopy[rowIndex][columnIndex] = nextPlayer;
      setBoard(boardCopy);
      setBoardHistory((prevBoardHistory) => [...prevBoardHistory, boardCopy]);
      const isGameWinner = checkIsWinner({
        nextRow: rowIndex,
        nextColumn: columnIndex,
        nextPlayer,
        board: boardCopy,
        boardSize,
      });
      const isGameDraw = checkIsDraw({
        board: boardCopy,
        boardSize,
        isWinner: isGameWinner,
      });
      setIsWinner(isGameWinner);
      setIsDraw(isGameDraw);
      setIsManualSelectionCompleted(true);
    }
  }

  function resetGame(boardSize: BoardSize = 3) {
    setCurrentPlayer("0");
    setIsManualSelectionCompleted(false);
    setPlayers({
      X: { name: "Player 1" },
      0: { name: "Player 2" },
    });
    setSelectedRow(null);
    setSelectedColumn(null);
    setIsWinner(false);
    setIsDraw(false);
    resetBoard(boardSize);
    setMovesHistory([]);
    setIsNewGame((prevIsNewGame) => !prevIsNewGame);
    setIsReplay(false);
    setBoardHistory([]);
  }

  function resetGameWithSameSettings() {
    setCurrentPlayer("0");
    setIsManualSelectionCompleted(false);
    setSelectedRow(null);
    setSelectedColumn(null);
    setIsWinner(false);
    setIsDraw(false);
    resetBoard(boardSize);
    setMovesHistory([]);
    setIsReplay(false);
    setBoardHistory([]);
  }

  function resetBoard(size: BoardSize) {
    const row = new Array(size).fill(null);

    let board: any[] = [];

    for (let i = 0; i < size; i++) {
      board.push([...row]);
    }
    setBoardSize(size);
    setBoard(board);
  }

  function handleNameChange(symbol: CurrentPlayer, newName: string) {
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
        <select
          value={playerType}
          onChange={(event) => setPlayerType(event.target.value as PlayerType)}
        >
          {playerTypes.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
        <br />
        <br />
      </div>
      <button onClick={(e) => setIsNewGame(true)}>Start New Game</button>
      <hr />
      {isNewGame && (
        <div>
          <GameStatus
            isWinner={isWinner}
            isDraw={isDraw}
            isReplay={isReplay}
            playerName={players[currentPlayer].name}
          />
          <h2>
            Current Turn: {players[currentPlayer === "X" ? "0" : "X"].name}
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
          {isWinner || isDraw ? (
            <div>
              <br />
              <button
                onClick={() => {
                  setIsReplay(true);
                  setReplayIndex(0);
                }}
              >
                Replay
              </button>
            </div>
          ) : (
            ""
          )}
          <br />
          <br />
          <Board
            board={board}
            selectCell={selectCellManually}
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
