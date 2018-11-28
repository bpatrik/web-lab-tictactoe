import {NextFunction, Request, Response} from 'express';
import {GameRepository} from '../model/GameRepository';

export class RenderMWs {

  public static renderResult(req: Request, res: Response, next: NextFunction) {
    if (typeof req.resultPipe === 'undefined') {
      return next();
    }

    return res.json(req.resultPipe);
  }

}
