import Ship from "./Ship";

export default class Game {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.ships = [];
  }

  placeShip(type, position, axis) {
    this.ships.push(new Ship(type, position, axis));
  }
}
