import Player from "./Player";
import Ship from "./Ship";

export default class Computer extends Player {
  constructor(drawBoard) {
    super("Computer", drawBoard);
  }

  getRandomCoords() {
    const shootX = Math.floor(Math.random() * this.enemyBoard.width);
    const shootY = Math.floor(Math.random() * this.enemyBoard.height);

    return { x: shootX, y: shootY };
  }

  shoot() {
    if (!this.enemyBoard) {
      return;
    }

    let coords = this.getRandomCoords();
    while (this.enemyBoard.takeShot(coords.x, coords.y) === -1) {
      coords = this.getRandomCoords();
    }
  }
}
