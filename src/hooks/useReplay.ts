import { useEffect } from 'react';
import { BoardGrid, GameStatus } from '../types/types';

type UseReplayParams = {
  gameStatus: GameStatus,
  boardHistory: BoardGrid[],
  replayIndex: number,
  setReplayIndex: React.Dispatch<React.SetStateAction<number>>;
  setBoard: React.Dispatch<React.SetStateAction<BoardGrid>>;
};

const useReplay = ({
  gameStatus,
  boardHistory,
  replayIndex,
  setReplayIndex,
  setBoard
}: UseReplayParams) => {
  useEffect(() => {
    let timeoutId: number | NodeJS.Timeout;

    if (gameStatus === GameStatus.Replay) {
      timeoutId = setTimeout(() => {
        if(boardHistory.length <= replayIndex) return

        const currentBoard = boardHistory[replayIndex];
        setBoard(currentBoard);
        setReplayIndex((prevReplayIndex) => prevReplayIndex + 1);
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [gameStatus, boardHistory, replayIndex, setBoard, setReplayIndex]);
}

export default useReplay;
