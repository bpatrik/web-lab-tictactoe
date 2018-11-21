"use strict";

/**
 *
 * @param {Game} game
 * @param $gameDiv
 * @constructor
 */
const UI = function (game, $gameDiv) {
    let that = this;

    that.$cells = [[null, null, null],
        [null, null, null],
        [null, null, null]];

    that.generateBoard = function () {
        $gameDiv.find('#game-board').empty();
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                that.$cells[x][y] = $('<div/>', {
                    class: 'board-cell available',
                    id: 'cell_' + x + '' + y
                }).html('&nbsp;');
                $gameDiv.find('#game-board').append(that.$cells[x][y]);
                that.$cells[x][y].click(function () {
                    game.onBoardClick(x, y);
                });
            }
            $gameDiv.find('#game-board').append($('<br/>'));
        }
    };

    game.onUpdate = function () {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (!game.board.isEmpty(x, y)) {
                    that.$cells[x][y].html(game.board.board[x][y]).removeClass('available');
                }
            }
        }
        $gameDiv.find('#player-info').html('next player: ' + game.nextPlayer);
        if(game.isGameOver()){
            if(game.isWinner(game.PLAYER_X)){
                $gameDiv.find('#player-info').html(game.PLAYER_X + ' won');
            }
            if(game.isWinner(game.PLAYER_O)){
                $gameDiv.find('#player-info').html(game.PLAYER_O + ' won');
            }
            if(!game.isMoreStep()){
                $gameDiv.find('#player-info').html('Tie');
            }
        }

    };


    that.generateBoard();

};