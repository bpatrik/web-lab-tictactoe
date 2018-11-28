import {GameDTO} from '../common/GameDTO';
import {CommandDTO} from '../common/CommandDTO';

export class ServerConnector {

  public onNewState = (gameState: GameDTO) => {
  };


  constructor(private url: string = '') {
    setInterval(async () => {
      const newState = await $.ajax({
        type: 'GET',
        url: this.url + '/api/game',
        dataType: 'json'
      });
      this.onNewState(newState);
    }, 100);
  }

  public onNewMove = async (x: number, y: number) => {
    const cmd: CommandDTO = {x: x, y: y};
    await $.ajax(this.url + '/api/game/command', <JQueryAjaxSettings>{
      type: 'POST',
      data: JSON.stringify(cmd),
      contentType: 'application/json',
    });
  };

}

