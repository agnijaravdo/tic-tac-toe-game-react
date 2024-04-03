import React, { useState } from "react";
import "./App.css";
import MovesHistory from "./components/MovesHistory";
import GameStatus from "./components/GameStatus";
import PlayerInfo from "./components/PlayerInfo";
import Board from "./components/Board";
import GameInfoCard from "./components/GameInfoCard";
import GameControlButtons from "./components/GameControlButtons";
import BoardSizeSelection from "./components/BoardSizeSelection";
import OpponentTypeSelection from "./components/OpponentTypeSelection";
import useRandomCellSelection from "./hooks/useRandomCellSelection";
import useReplay from "./hooks/useReplay";
import {
  BoardGrid,
  BoardSize,
  CurrentPlayer,
  HistoryEntry,
  PlayerType,
  Players,
} from "./types/types";
import { updateGameStatus } from "./utils/updateGameStatus";

function App() {
  const [boardSize, setBoardSize] = useState<BoardSize>(3);
  const [playerType, setPlayerType] = useState<PlayerType>(PlayerType.Human);
  const [isNewGame, setIsNewGame] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>("0");

  const nextPlayer = currentPlayer === "X" ? "0" : "X";

  const [movesHistory, setMovesHistory] = useState<HistoryEntry[]>([]);
  const [replayIndex, setReplayIndex] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isManualSelectionCompleted, setIsManualSelectionCompleted] =
    useState(false);
  const [players, setPlayers] = useState<Players>({
    X: { name: "Player 1" },
    0: { name: "Player 2" },
  });
  const [boardHistory, setBoardHistory] = useState<BoardGrid[]>(() => {
    const row = new Array(boardSize).fill(null);

    let board: BoardGrid = [];

    for (let i = 0; i < boardSize; i++) {
      board.push([...row]);
    }

    return [board];
  });
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
    players,
    board,
    setIsManualSelectionCompleted,
    setBoard,
    setBoardHistory,
    setMovesHistory,
    setIsWinner,
    setIsDraw,
    setCurrentPlayer,
  });

  useReplay({
    isReplay,
    boardHistory,
    replayIndex,
    setReplayIndex,
    setBoard,
  });

  function processAndRecordPlayerMove(
    rowIndex: number,
    columnIndex: number,
    nextPlayer: CurrentPlayer
  ): BoardGrid {
    const boardCopy = structuredClone(board);
    boardCopy[rowIndex][columnIndex] = nextPlayer;

    setBoard(boardCopy);
    setBoardHistory((prevBoardHistory) => [...prevBoardHistory, boardCopy]);

    setMovesHistory((prevMovesHistory) => [
      ...prevMovesHistory,
      [players[nextPlayer].name, nextPlayer, rowIndex, columnIndex],
    ]);

    return boardCopy;
  }

  function selectCellManuallyAndUpdateGameStatus(
    rowIndex: number,
    columnIndex: number
  ) {
    if (isReplay) return;
    if (isManualSelectionCompleted && playerType === PlayerType.AI) return;

    if (!board[rowIndex][columnIndex] && !isWinner) {
      const updatedBoard = processAndRecordPlayerMove(
        rowIndex,
        columnIndex,
        nextPlayer
      );
      const { isGameWinner, isGameDraw } = updateGameStatus(
        updatedBoard,
        rowIndex,
        columnIndex,
        nextPlayer,
        boardSize
      );
      setIsWinner(isGameWinner);
      setIsDraw(isGameDraw);
      setCurrentPlayer(nextPlayer);
      setIsManualSelectionCompleted(true);
    }
  }

  function resetCommonGameStates(boardSize: BoardSize) {
    setCurrentPlayer("0");
    setIsManualSelectionCompleted(false);
    setIsWinner(false);
    setIsDraw(false);
    resetBoard(boardSize);
    setMovesHistory([]);
    setIsReplay(false);
    setBoardHistory([]);
  }

  function resetGame(boardSize: BoardSize = 3) {
    setPlayers({
      X: { name: "Player 1" },
      0: { name: "Player 2" },
    });
    setPlayerType(PlayerType.Human);
    setIsNewGame((prevIsNewGame) => !prevIsNewGame);
    resetCommonGameStates(boardSize);
  }

  function rematchGameWithSameSettings() {
    resetCommonGameStates(boardSize);
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
      <div className="d-flex flex-column align-items-center">
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
            <div className="grid-container">
              <div className="d-flex justify-content-center">
                {!isDraw && !isWinner && (
                  <GameInfoCard
                    boardSize={boardSize}
                    nextPlayer={nextPlayer}
                    players={players}
                  />
                )}
              </div>
              <div>
                <Board
                  board={board}
                  selectCell={selectCellManuallyAndUpdateGameStatus}
                />
              </div>
              {!isReplay && (
                <div>
                  {movesHistory.length > 0 ? (
                    <MovesHistory moves={movesHistory} />
                  ) : (
                    <div className="hidden-moves-history"></div>
                  )}
                </div>
              )}
            </div>

            <GameControlButtons
              resetGame={resetGame}
              rematchGameWithSameSettings={rematchGameWithSameSettings}
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
