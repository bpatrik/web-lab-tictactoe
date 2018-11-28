import {BoardDTO} from './BoardDTO';

export type playerType = 'O' | 'X';

export interface GameDTO {
  nextPlayer: playerType;
  board: BoardDTO;
  winner: playerType;
  gameOver: boolean;
}
