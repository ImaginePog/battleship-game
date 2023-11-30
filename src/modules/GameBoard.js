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

  getAdjacentSpaces(x, y) {
    const spaces = [];

    // Left
    const leftSpace = { x: x - 1, y: y };
    if (leftSpace.x >= 0) {
      spaces.push(leftSpace);
    }
    // Right
    const rightSpace = { x: x + 1, y: y };
    if (rightSpace.x < this.width) {
      spaces.push(rightSpace);
    }

    // Up
    const upSpace = { x: x, y: y - 1 };
    if (upSpace.y >= 0) {
      spaces.push(upSpace);
    }

    // Down
    const downSpace = { x: x, y: y + 1 };
    if (downSpace.y < this.height) {
      spaces.push(downSpace);
    }

    return spaces;
  }

  placeShip(ship) {
    for (let i = 0; i < ship.occupied.length; ++i) {
      const space = ship.occupied[i];

      const adjSpaces = this.getAdjacentSpaces(space.x, space.y);
      for (let j = 0; j < adjSpaces.length; ++j) {
        if (this.getSpace(adjSpaces[j].x, adjSpaces[j].y) !== " ") {
          return false;
        }
      }

      if (this.getSpace(space.x, space.y) !== " ") {
        return false;
      }
    }

    ship.occupied.forEach((space) => {
      this.setSpace(space.x, space.y, ship.token);
    });
    this.ships.push(ship);
    return true;
  }

  // Takes coords of a space and returns
  // True if a ship recieved a hit
  // False if the shot missed
  // -1 if the shot cant be made
  takeShot(x, y) {
    // Mark as missed shot if empty space
    const space = this.getSpace(x, y);

    if (space === " ") {
      this.setSpace(x, y, "X");
      return false;
    }

    // Already shot here
    if (space === "X" || space === "O") {
      return -1;
    }

    // Space is a ship

    for (let i = 0; i < this.ships.length; ++i) {
      const occupiedSpaces = this.ships[i].occupied;
      const found = occupiedSpaces.findIndex(
        (occupied) => occupied.x == x && occupied.y == y
      );

      // Found therefore this is the ship to take hit
      if (found >= 0) {
        this.setSpace(x, y, "O");
        this.ships[i].hit();
        return true;
      }
    }
  }

  // Retur
  areAllSunk() {
    let sunk = true;

    for (let i = 0; i < this.ships.length; ++i) {
      if (!this.ships[i].sunk) {
        sunk = false;
        break;
      }
    }

    return sunk;
  }
}
