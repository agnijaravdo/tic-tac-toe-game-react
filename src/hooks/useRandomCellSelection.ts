import { useEffect } from 'react';
import { BoardGrid, BoardSize, CurrentPlayer, GameStatus, HistoryEntry, PlayerType, Players } from '../types/types';
import { updateGameStatus } from '../utils/updateGameStatus';

type UseRandomCellSelectionParams = {
  boardSize: BoardSize,
  playerType: PlayerType,
  isManualSelectionCompleted: boolean,
  players: Players,
  board: BoardGrid,
  gameStatus: GameStatus,
  setIsManualSelectionCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setBoard: React.Dispatch<React.SetStateAction<BoardGrid>>;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  setBoardHistory: React.Dispatch<React.SetStateAction<BoardGrid[]>>;
  setMovesHistory: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<CurrentPlayer>>;
};

const useRandomCellSelection = ({
  boardSize,
  playerType,
  isManualSelectionCompleted,
  players,
  board,
  gameStatus,
  setIsManualSelectionCompleted,
  setBoard,
  setBoardHistory,
  setMovesHistory,
  setGameStatus,
  setCurrentPlayer,
}: UseRandomCellSelectionParams) => {
  useEffect(() => {
    function selectCellRandomly(gameStatus: GameStatus) {
      if (playerType === PlayerType.AI && gameStatus === GameStatus.InProgress) {
        let availableCells = [];
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
          const nextPlayer = "0";

          const boardCopy = structuredClone(board);
          boardCopy[randomRow][randomColumn] = nextPlayer;
          setBoard(boardCopy);
          setBoardHistory((prevBoardHistory) => [...prevBoardHistory, boardCopy]);

          setMovesHistory((prevMovesHistory) => [
            ...prevMovesHistory,
            [players["0"].name, "0", randomRow, randomColumn],
          ]);

          const { isGameWinner, isGameDraw } = updateGameStatus(
            boardCopy,
            randomRow,
            randomColumn,
            nextPlayer,
            boardSize
          );
          if (isGameWinner) {
            setGameStatus(GameStatus.Winner);
          }
          if (isGameDraw) {
            setGameStatus(GameStatus.Draw);
          }
          setCurrentPlayer(nextPlayer);
        }
      }
    }

    if (isManualSelectionCompleted && playerType === PlayerType.AI) {
      const timeoutId = setTimeout(() => {
        selectCellRandomly(gameStatus);
        setIsManualSelectionCompleted(false);
        ;
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [boardSize, playerType, isManualSelectionCompleted, players, board, gameStatus, setBoard, setBoardHistory, setMovesHistory, setGameStatus, setCurrentPlayer, setIsManualSelectionCompleted]);
}

export default useRandomCellSelection;
