import {expect} from 'chai';
import {Board} from '../../../../backend/model/Board';

describe('Board', () => {

  it('cells should be empty', () => {
    const board = new Board();
    for (let x = 0; x < board.Cells.length; x++) {
      for (let y = 0; y < board.Cells.length; y++) {
        expect(board.Cells[x][y]).to.be.null;
      }
    }

    for (let x = 0; x < board.Cells.length; x++) {
      for (let y = 0; y < board.Cells.length; y++) {
        expect(board.isEmpty(x, y)).to.be.true;
      }
    }
  });

  it('should set cell', () => {
    const board = new Board();
    board.set(0, 0, 'X');
    expect(board.Cells[0][0]).to.be.eql('X');
  });


  it('should not reset cell', () => {
    const board = new Board();
    board.set(0, 0, 'X');
    expect(board.Cells[0][0]).to.be.eql('X');

    expect(() => {
      board.set(0, 0, 'X');
    }).to.throw();
  });
});
