export type BoardSize = 3 | 4 | 5;

export type CurrentPlayer = "X" | "0";

export type HistoryEntry = [string, CurrentPlayer, number, number];

export type BoardGrid = (string | null)[][];

export type Players = {
  X: { name: string };
  0: { name: string };
};

export enum PlayerType {
  Human = "Human",
  AI = "AI",
}

export enum GameStatus {
  NewGame = "New Game",
  InProgress = "In Progress",
  Draw = "Draw",
  Winner = "Winner",
  Replay = "Replay",
}
