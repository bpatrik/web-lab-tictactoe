import {Express, NextFunction, Request, Response} from 'express';
import {GameMWs} from '../middlewares/GameMWs';
import {RenderMWs} from '../middlewares/RenderMWs';

export class GameRouter {

  public static route(app: Express) {

    this.addGetGame(app);
    this.addPostCommand(app);
  }

  private static addGetGame(app: Express) {
    app.get('/api/game',
      GameMWs.getGame,
      RenderMWs.renderResult
    );
  }

  private static addPostCommand(app: Express) {
    app.post('/api/game/command',
      GameMWs.newCommand,
      RenderMWs.renderResult
    );
  }
}
