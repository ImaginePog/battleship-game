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

  shoot(enemy) {
    let coords = this.getRandomCoords(enemy.gameboard);
    while (enemy.gameboard.takeShot(coords.x, coords.y) === -1) {
      coords = this.getRandomCoords(enemy.gameboard);
    }
  }
}
