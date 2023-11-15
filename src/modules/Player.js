import GameBoard from "./GameBoard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new GameBoard();
  }

  placeShip(ship) {
    return this.gameboard.placeShip(ship);
  }

  shoot(enemy, x, y) {
    return enemy.gameboard.takeShot(x, y);
  }

  lost() {
    return this.gameboard.areAllSunk();
  }
}
