import Ship from "./Ship";

export default class GameBoard {
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

    for (let i = 0; i < placedShip.occupied.length; ++i) {
      const space = placedShip.occupied[i];
      if (this.getSpace(space.x, space.y) !== " ") {
        return false;
      }

      this.setSpace(space.x, space.y, placedShip.token);
    }
    this.ships.push(placedShip);
    return true;
  }

  takeShot(x, y) {
    // Mark as missed shot if empty space
    const space = this.getSpace(x, y);
    if (space === " ") {
      this.setSpace(x, y, "X");
      return;
    }

    // If space is a ship
    for (let i = 0; i < this.ships.length; ++i) {
      const occupiedSpaces = this.ships[i].occupied;
      const found = occupiedSpaces.findIndex(
        (occupied) => occupied.x === x && occupied.y === y
      );

      // Found therefore this is the ship to take hit
      if (found >= 0) {
        this.ships[i].hit();
        break;
      }
    }
  }
}
