import {Game} from './Game';

export class GameRepository {

  private static instance: GameRepository = null;

  public static get Instance(): GameRepository {
    if (this.instance === null) {
      this.instance = new GameRepository();
    }
    return this.instance;
  }

  game: Game = new Game();

  getGame(): Game {
    return this.game;
  }

}
