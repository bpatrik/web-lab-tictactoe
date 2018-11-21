"use strict";

const Board = function () {
    let that = this;

    that.board = [[null, null, null],
        [null, null, null],
        [null, null, null]];


    that.isEmpty = function (x, y) {
        return that.board[x][y] === null;
    };

    that.set = function (x, y, player) {
        if (!that.isEmpty(x, y)) {
            throw new Error('cell not empty');
        }
        that.board[x][y] = player;
    };

    that.get = function (x, y) {
        return that.board[x][y];
    };


    that.getSerialized = function (i) {
        return that.board[i % that.board.length][Math.floor(i / that.board.length)];
    };


};