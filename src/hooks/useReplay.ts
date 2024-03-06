import { useEffect } from 'react';
import { BoardGrid } from '../types/types';

type UseReplayParams = {
  isReplay: boolean,
  boardHistory: BoardGrid[],
  replayIndex: number,
  setReplayIndex: React.Dispatch<React.SetStateAction<number>>;
  setBoard: React.Dispatch<React.SetStateAction<BoardGrid>>;
};

const useReplay = ({
  isReplay,
  boardHistory,
  replayIndex,
  setReplayIndex,
  setBoard
}: UseReplayParams) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardHistory, replayIndex, isReplay]);
}

export default useReplay;
