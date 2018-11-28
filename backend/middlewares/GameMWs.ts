import {NextFunction, Request, Response} from 'express';
import {GameRepository} from '../model/GameRepository';
import {CommandDTO} from '../../common/CommandDTO';

export class GameMWs {

  public static getGame(req: Request, res: Response, next: NextFunction) {
    req.resultPipe = GameRepository.Instance.getGame().toJson();
    return next();
  }


  public static newCommand(req: Request, res: Response, next: NextFunction) {
    if (typeof req.body === 'undefined' ||
      typeof (<CommandDTO>req.body).y === 'undefined' ||
      typeof (<CommandDTO>req.body).x === 'undefined') {
      return next();
    }

    const command = <CommandDTO>req.body;
    GameRepository.Instance.getGame().onBoardClick(command.x, command.y);
    req.resultPipe = 'ok';
    return next();
  }
}
