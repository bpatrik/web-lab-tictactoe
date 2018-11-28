import {Express, NextFunction, Request, Response} from 'express';
import {GameMWs} from '../middlewares/GameMWs';
import {RenderMWs} from '../middlewares/RenderMWs';
import * as express from 'express';
import * as path from 'path';

export class PublicRouter {

  public static route(app: Express) {
    this.addGetStatic(app);
  }

  private static addGetStatic(app: Express) {
    app.use(express.static(path.resolve(__dirname, './../../frontend'), {maxAge: 31536000}));
  }

}
