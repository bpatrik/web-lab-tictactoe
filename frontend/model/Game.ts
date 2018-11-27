import {Board} from "./Board";

export type playerType = 'O' | 'X';

export class Game {

    public readonly PLAYER_X: playerType = 'X';
    public readonly PLAYER_O: playerType = 'O';
    private nextPlayer: playerType = this.PLAYER_X;
    private board = new Board();
    public onUpdate = function () {
    };

    changePlayer() {
        this.nextPlayer = this.nextPlayer === this.PLAYER_X ? this.PLAYER_O : this.PLAYER_X;
    };

    public get Board():Board{
        return this.board;
    }
    public get NextPlayer():playerType{
        return this.nextPlayer;
    }

    isWinner(player: playerType) {

        const horizontal = [0, 3, 6].map(i => {
            return [i, i + 1, i + 2]
        });
        const vertical = [0, 1, 2].map(i => {
            return [i, i + 3, i + 6]
        });
        const diagonal = [[0, 4, 8], [2, 4, 6]];
        const allWins = [].concat(horizontal).concat(vertical).concat(diagonal);

        for (let i = 0; i < allWins.length; i++) {
            let indices = allWins[i];
            let found = true;
            for (let j = 0; j < indices.length; j++) {
                if (this.board.getSerialized(indices[j]) !== player) {
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

    isMoreStep(): boolean {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (this.board.get(x, y) === null) {
                    return true;
                }
            }
        }
        return false;
    };

    isGameOver(): boolean {
        return this.isWinner(this.PLAYER_O) || this.isWinner(this.PLAYER_X) || !this.isMoreStep();
    };

    onBoardClick(x, y): void {
        if (!this.board.isEmpty(x, y) || this.isGameOver()) {
            return;
        }
        this.board.set(x, y, this.nextPlayer);
        this.changePlayer();

        this.onUpdate();
    }
}
