import Ship from "./Ship";

export default class Game {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.ships = [];
    this.board = this.createBoard();
  }

  createBoard() {
    const board = [];

    for (let i = 0; i < this.height; ++i) {
      const row = [];
      for (let j = 0; j < this.width; ++j) {
        row.push(" ");
      }
      board.push(row);
    }

    return board;
  }

  getSpace(x, y) {
    return this.board[y][x];
  }

  setSpace(x, y, token) {
    this.board[y][x] = token;
  }

  calibrate(ship) {
    let outOfBounds = false;
    for (let i = 0; i < ship.occupied.length; ++i) {
      if (ship.occupied[i].x > this.width - 1) {
        outOfBounds = true;
        break;
      } else if (ship.occupied[i].y > this.height - 1) {
        outOfBounds = true;
        break;
      }
    }

    if (outOfBounds) {
      const newPosition = { x: 0, y: 0 };
      if (ship.axis === "x") {
        newPosition.x = ship.position.x - 1;
        newPosition.y = ship.position.y;
      } else {
        newPosition.x = ship.position.x;
        newPosition.y = ship.position.y - 1;
      }

      ship = this.calibrate(new Ship(ship.type, newPosition, ship.axis));
    }

    return ship;
  }

  placeShip(type, position, axis) {
    let placedShip = this.calibrate(new Ship(type, position, axis));

    this.ships.push(placedShip);
  }
}
