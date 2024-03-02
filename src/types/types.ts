export type BoardSize = 3 | 4 | 5;

export type CurrentPlayer = "X" | "0";

export type HistoryEntry = [string, CurrentPlayer, number, number];
export type BoardGrid = (string | null)[][];