import {BoardDTO} from './BoardDTO';

export type playerType = 'O' | 'X';

export interface GameDTO {
  NextPlayer: playerType;
  Board: BoardDTO;
  Winner: playerType;
  GameOver: boolean;
}
