import {BoardDTO} from '../../common/BoardDTO';
import {playerType} from '../../common/GameDTO';

export class Board {
  private cells: playerType[][] = [[null, null, null],
    [null, null, null],
    [null, null, null]];

  isEmpty(x: number, y: number): boolean {
    return this.cells[x][y] === null;
  }

  set(x: number, y: number, player: playerType): void {
    if (!this.isEmpty(x, y)) {
      throw new Error('cell not empty');
    }
    this.cells[x][y] = player;
  }


  get Cells(): ReadonlyArray<ReadonlyArray<playerType>> {
    return this.cells;
  }

  getSerialized(i: number): playerType {
    return this.cells[i % this.cells.length][Math.floor(i / this.cells.length)];
  }

  public toJson(): BoardDTO {
    return {
      cells: this.Cells
    };
  }
}
