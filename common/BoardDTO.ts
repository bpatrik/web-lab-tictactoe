import {playerType} from './IGame';

export interface BoardDTO {
  Cells: ReadonlyArray<ReadonlyArray<playerType>>;
}
