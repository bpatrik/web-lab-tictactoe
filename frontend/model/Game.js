"use strict";

const Game = function () {
    let that = this;

    that.PLAYER_X = 'X';
    that.PLAYER_O = 'O';
    that.nextPlayer = that.PLAYER_X;
    that.board = new Board();
    that.onUpdate = function () {
    };

    that.changePlayer = function () {
        that.nextPlayer = that.nextPlayer === that.PLAYER_X ? that.PLAYER_O : that.PLAYER_X;
    };

    that.isWinner = function (player) {


        const horizontal = [0, 3, 6].map(i => {
            return [i, i + 1, i + 2]
        });
        const vertical = [0, 1, 2].map(i => {
            return [i, i + 3, i + 6]
        });
        const diagonal = [[0, 4, 8], [2, 4, 6]];

        let allwins = [].concat(horizontal).concat(vertical).concat(diagonal);


        for (let i = 0; i < allwins.length; i++) {
            let indices = allwins[i];
            let found = true;
            for (let j = 0; j < indices.length; j++) {
                if (that.board.getSerialized(indices[j]) !== player) {
                    found = false;
                    break;
                }
            }
            if (found === true) {
                return true;
            }
        }
        return false;
    };

    that.isMoreStep = function(){
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if(that.board.get(x,y) === null){
                    return true;
                }
            }
        }
        return false;
    };

    that.isGameOver = function () {
        return that.isWinner(that.PLAYER_O) || that.isWinner(that.PLAYER_X) || !that.isMoreStep();
    };

    that.onBoardClick = function (x, y) {
        if (!that.board.isEmpty(x, y) || that.isGameOver()) {
            return;
        }
        that.board.set(x, y, that.nextPlayer);
        that.changePlayer();

        that.onUpdate();
    }
};