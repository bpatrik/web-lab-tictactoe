import {Game} from './model/Game';
import {GameDTO} from '../common/GameDTO';

export class UI {

  private $cells: JQuery[][] = [[null, null, null],
    [null, null, null],
    [null, null, null]];

  constructor(private game: Game, private $gameDiv: JQuery) {
    this.game.onUpdate = () => {
      this.updateUI(this.game);
    };
    this.generateBoard();
  }

  private updateUI(game: GameDTO) {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (!this.game.Board.isEmpty(x, y)) {
          this.$cells[x][y].html(this.game.Board.Cells[x][y]).removeClass('available');
        }
      }
    }
    this.$gameDiv.find('#player-info').html('next player: ' + this.game.NextPlayer);
    if (game.GameOver) {
      if (game.Winner !== null) {
        this.$gameDiv.find('#player-info').html(game.Winner + ' won');
      } else {
        this.$gameDiv.find('#player-info').html('Tie');
      }
    }
  }

  private generateBoard(): void {
    this.$gameDiv.find('#game-board').empty();
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        this.$cells[x][y] = $('<div/>', {
          class: 'board-cell available',
          id: 'cell_' + x + '' + y
        }).html('&nbsp;');
        this.$gameDiv.find('#game-board').append(this.$cells[x][y]);
        this.$cells[x][y].click(() => {
          this.game.onBoardClick(x, y);
        });
      }
      this.$gameDiv.find('#game-board').append($('<br/>'));
    }
  }
}
