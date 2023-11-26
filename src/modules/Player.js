import GameBoard from "./GameBoard";

export default class Player {
  constructor(name, drawBoard) {
    this.name = name;
    this.gameboard = new GameBoard();
    this.drawBoard = drawBoard;
  }

  placeShip(ship) {
    return this.gameboard.placeShip(ship);
  }

  shoot(x, y) {
    if (this.enemyBoard) return this.enemyBoard.takeShot(x, y);
  }

  lost() {
    return this.gameboard.areAllSunk();
  }

  render(showShips, highlights) {
    this.drawBoard.innerText = "";

    for (let y = 0; y < this.gameboard.height; y++) {
      const row = document.createElement("div");
      row.classList.add("game-row");
      for (let x = 0; x < this.gameboard.width; x++) {
        const cell = document.createElement("cell");
        cell.classList.add("game-cell");
        cell.dataset.x = x;
        cell.dataset.y = y;

        if (highlights) {
          const index = highlights.findIndex(
            (space) => space.x == x && space.y == y
          );
          if (index >= 0) {
            // Found highlight cell
            cell.classList.add("highlight-cell");
          }
        }

        switch (this.gameboard.getSpace(x, y)) {
          case " ":
            cell.classList.add("empty-cell");
            break;
          case "X":
            cell.classList.add("missed-cell");
            break;
          case "P":
          case "D":
          case "B":
          case "C":
          case "S":
            if (showShips) cell.classList.add("ship-cell");
            break;
          case "O":
            cell.classList.add("shot-cell");
            break;
        }

        row.appendChild(cell);
      }
      this.drawBoard.appendChild(row);
    }
  }
}
