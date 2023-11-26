import Player from "./Player";

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
    let result = this.enemyBoard.takeShot(coords.x, coords.y);
    while (result === -1) {
      coords = this.getRandomCoords();
      result = this.enemyBoard.takeShot(coords.x, coords.y);
    }
    return result;
  }
}
