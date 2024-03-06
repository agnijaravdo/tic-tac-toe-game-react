import React, { useState } from "react";
import "./App.css";
import MovesHistory from "./components/MovesHistory";
import GameStatus from "./components/GameStatus";
import PlayerInfo from "./components/PlayerInfo";
import Board from "./components/Board";
import GameInfoCard from "./components/GameInfoCard";
import GameControlButtons from "./components/GameControlButtons";
import { checkIsDraw, checkIsWinner } from "./utils";
import {
  BoardGrid,
  BoardSize,
  CurrentPlayer,
  HistoryEntry,
  PlayerType,
  Players,
} from "./types/types";
import BoardSizeSelection from "./components/BoardSizeSelection";
import OpponentTypeSelection from "./components/OpponentTypeSelection";
import useRandomCellSelection from "./hooks/useRandomCellSelection";
import useReplay from "./hooks/useReplay";

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

  useRandomCellSelection({
    boardSize,
    playerType,
    isDraw,
    isManualSelectionCompleted,
    isWinner,
    setIsManualSelectionCompleted,
    setBoard,
    setBoardHistory,
    setMovesHistory,
    setIsWinner,
    setIsDraw,
    setCurrentPlayer,
    players,
    board,
  });

  useReplay({
    isReplay,
    boardHistory,
    replayIndex,
    setReplayIndex,
    setBoard,
  });

  function selectCellManually(rowIndex: number, columnIndex: number) {
    if (isReplay) return; // preventing cell selection when replay is hapenning
    if (isManualSelectionCompleted && playerType === PlayerType.AI) return; // preventing cell selection when is AI move
    if (!board[rowIndex][columnIndex] && !isWinner) {
      const nextPlayer = currentPlayer === "X" ? "0" : "X";
      setMovesHistory((prevMovesHistory) => [
        ...prevMovesHistory,
        [players[nextPlayer].name, nextPlayer, rowIndex, columnIndex],
      ]);
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
    <div>
      <div className="container text-center mt-5">
        <h1>Tic Tac Toe Game</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isNewGame && (
          <div className="mx-auto p-3">
            <BoardSizeSelection boardSize={boardSize} resetBoard={resetBoard} />
            <div className="mb-3">
              <ol id="players" className="list-unstyled">
                <PlayerInfo
                  name={players.X.name}
                  symbol="X"
                  onNameChange={handleNameChange}
                />
                <PlayerInfo
                  name={players["0"].name}
                  symbol="0"
                  onNameChange={handleNameChange}
                />
              </ol>
              <OpponentTypeSelection
                playerType={playerType}
                setPlayerType={setPlayerType}
              />
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-success"
                onClick={(e) => setIsNewGame(true)}
              >
                Start New Game
              </button>
            </div>
          </div>
        )}

        {isNewGame && (
          <>
            <GameStatus
              isWinner={isWinner}
              isDraw={isDraw}
              isReplay={isReplay}
              playerName={players[currentPlayer].name}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "4rem",
              }}
            >
              <GameInfoCard
                boardSize={boardSize}
                currentPlayer={currentPlayer}
                players={players}
              />
              <Board board={board} selectCell={selectCellManually} />
              <div className="moves-history ms-5" style={{ maxWidth: "18rem" }}>
                <MovesHistory moves={movesHistory} />
              </div>
            </div>
            <GameControlButtons
              resetGame={resetGame}
              resetGameWithSameSettings={resetGameWithSameSettings}
              isWinner={isWinner}
              isDraw={isDraw}
              setIsReplay={setIsReplay}
              setReplayIndex={setReplayIndex}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
