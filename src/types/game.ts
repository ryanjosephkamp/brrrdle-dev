export type LetterState = 'empty' | 'tbd' | 'correct' | 'present' | 'absent';

export interface TileData {
  letter: string;
  state: LetterState;
}

export interface GameRow {
  tiles: TileData[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  wordLength: number;
  maxGuesses: number;
  currentRow: number;
  board: GameRow[];
  currentGuess: string;
  status: GameStatus;
  solution: string;
  hardMode: boolean;
}
