import {playerType} from './GameDTO';


export interface BoardDTO {
  cells: ReadonlyArray<ReadonlyArray<playerType>>;
}
