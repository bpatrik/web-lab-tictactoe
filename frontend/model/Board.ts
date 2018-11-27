import {playerType} from './Game';


export class Board {
  private board: playerType[][] = [[null, null, null],
    [null, null, null],
    [null, null, null]];

  isEmpty(x: number, y: number): boolean {
    return this.board[x][y] === null;
  }

  set(x: number, y: number, player: playerType): void {
    if (!this.isEmpty(x, y)) {
      throw new Error('cell not empty');
    }
    this.board[x][y] = player;
  }

  get(x: number, y: number): playerType {
    return this.board[x][y];
  }


  getSerialized(i: number): playerType {
    return this.board[i % this.board.length][Math.floor(i / this.board.length)];
  }
}
