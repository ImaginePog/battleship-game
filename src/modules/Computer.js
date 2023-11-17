import Player from "./Player";

export default class Computer extends Player {
  constructor(name = "Computer") {
    super(name);
  }

  getRandomCoords(board) {
    const shootX = Math.floor(Math.random() * board.width);
    const shootY = Math.floor(Math.random() * board.height);

    return { x: shootX, y: shootY };
  }

  shoot() {
    if (!this.enemyBoard) {
      return;
    }

    let coords = this.getRandomCoords(this.enemyBoard);
    while (this.enemyBoard.takeShot(coords.x, coords.y) === -1) {
      coords = this.getRandomCoords(this.enemyBoard);
    }
  }
}
