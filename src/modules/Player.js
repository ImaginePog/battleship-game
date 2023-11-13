import GameBoard from "./GameBoard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new GameBoard();
  }

  placeShip(type, position, axis) {
    return this.gameboard.placeShip(type, position, axis);
  }
}
