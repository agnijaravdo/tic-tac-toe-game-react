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
  }, [boardHistory, replayIndex, isReplay, setBoard, setReplayIndex]);
}

export default useReplay;
