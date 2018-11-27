import {Game} from './model/Game';

export class UI {

  private $cells: JQuery[][] = [[null, null, null],
    [null, null, null],
    [null, null, null]];

  constructor(private game: Game, private $gameDiv: JQuery) {


    this.game.onUpdate = () => {
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          if (!this.game.Board.isEmpty(x, y)) {
            this.$cells[x][y].html(this.game.Board.get(x, y)).removeClass('available');
          }
        }
      }
      $gameDiv.find('#player-info').html('next player: ' + this.game.NextPlayer);
      if (game.isGameOver()) {
        if (game.isWinner(game.PLAYER_X)) {
          $gameDiv.find('#player-info').html(game.PLAYER_X + ' won');
        }
        if (game.isWinner(game.PLAYER_O)) {
          $gameDiv.find('#player-info').html(game.PLAYER_O + ' won');
        }
        if (!game.isMoreStep()) {
          $gameDiv.find('#player-info').html('Tie');
        }
      }

    };
    this.generateBoard();
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
