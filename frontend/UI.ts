import {GameDTO} from '../common/GameDTO';

export class UI {

  private $cells: JQuery[][] = [[null, null, null],
    [null, null, null],
    [null, null, null]];

  public onCellClick = (x: number, y: number) => {
  };

  constructor(private $gameDiv: JQuery) {
    this.generateBoard();
  }

  public updateUI = (game: GameDTO) => {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (game.board.cells[x][y]) {
          this.$cells[x][y].html(game.board.cells[x][y]).removeClass('available');
        }
      }
    }
    this.$gameDiv.find('#player-info').html('next player: ' + game.nextPlayer);
    if (game.gameOver) {
      if (game.winner !== null) {
        this.$gameDiv.find('#player-info').html(game.winner + ' won');
      } else {
        this.$gameDiv.find('#player-info').html('Tie');
      }
    }
  };

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
          this.onCellClick(x, y);
        });
      }
      this.$gameDiv.find('#game-board').append($('<br/>'));
    }
  }
}
