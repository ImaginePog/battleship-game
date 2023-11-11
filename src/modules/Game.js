export default class Game {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.board = this.createBoard();
  }

  createBoard() {
    const board = [];
    for (let x = 0; x < this.height; ++x) {
      board.push([]);
      for (let y = 0; y < this.width; ++y) {
        board[x].push(" ");
      }
    }
    return board;
  }
}
