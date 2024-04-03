import { useEffect } from 'react';
import { BoardGrid, BoardSize, CurrentPlayer, HistoryEntry, PlayerType, Players } from '../types/types';
import { updateGameStatus } from '../utils/updateGameStatus';

type UseRandomCellSelectionParams = {
  boardSize: BoardSize,
  playerType: PlayerType,
  isDraw: boolean,
  isManualSelectionCompleted: boolean,
  isWinner: boolean,
  players: Players,
  board: BoardGrid,
  setIsManualSelectionCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setBoard: React.Dispatch<React.SetStateAction<BoardGrid>>;
  setBoardHistory: React.Dispatch<React.SetStateAction<BoardGrid[]>>;
  setMovesHistory: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
  setIsWinner: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<CurrentPlayer>>;
};

const useRandomCellSelection = ({
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
}: UseRandomCellSelectionParams) => {
  useEffect(() => {
    function selectCellRandomly(isGameWinner: boolean, isGameDraw: boolean) {
      if (playerType === PlayerType.AI && !isGameWinner && !isGameDraw) {
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
          setIsWinner(isGameWinner);
          setIsDraw(isGameDraw);
          setCurrentPlayer(nextPlayer);
        }
      }
    }

    if (isManualSelectionCompleted && playerType === PlayerType.AI) {
      const timeoutId = setTimeout(() => {
        selectCellRandomly(isWinner, isDraw);
        setIsManualSelectionCompleted(false);
        ;
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [boardSize, playerType, isDraw, isManualSelectionCompleted, isWinner, players, board, setBoard, setBoardHistory, setMovesHistory, setIsWinner, setIsDraw, setCurrentPlayer, setIsManualSelectionCompleted]);
}

export default useRandomCellSelection;
