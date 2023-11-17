import Computer from "./Computer";
import DOM from "./DOM";
import EventHandler from "./EventHandler";
import Player from "./Player";
import Ship from "./Ship";

export default class Game {
  constructor(type, player1Name, player2Name) {
    const player1Board = DOM.getElement(".player1-board");
    this.player1 = new Player(player1Name, player1Board);

    const player2Board = DOM.getElement(".player2-board");

    if (type == "singleplayer") {
      this.player2 = new Computer(player2Board);
    } else {
      this.player2 = new Player(player2Name, player2Board);
    }

    this.width = 10;
    this.height = 10;

    this.player1.enemyBoard = this.player2.gameboard;
    this.player2.enemyBoard = this.player1.gameboard;
    this.currentPlayer = this.player1;
    this.otherPlayer = this.player2;
    this.turn = 0;

    this.shipsToPlace = [
      "Carrier",
      "Battle",
      "Patrol",
      "Destroyer",
      "Submarine",
    ];

    this.currentPlacement = { shipType: 0, axis: "x" };

    this.state = "placement";
    this.currentPlayer.render();
  }

  nextTurn() {
    this.turn = (this.turn + 1) % 2;

    if (this.turn == 0) {
      this.currentPlayer = this.player1;
      this.otherPlayer = this.player2;
    } else {
      this.currentPlayer = this.player2;
      this.otherPlayer = this.player1;
    }

    if (this.currentPlayer instanceof Computer) {
      this.playComputer();
    }
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

  playComputer() {
    this.currentPlayer.shoot();
    this.render();
    this.nextTurn();
  }

  play(coords) {
    if (coords.player == this.turn + 1) {
      return;
    }

    const result = this.currentPlayer.shoot(coords.x, coords.y);

    if (result === -1) {
      // Cant shoot
      return;
    }

    this.render();
    this.nextTurn();
  }

  place() {
    const placed = this.currentPlayer.placeShip(this.currentPlacement.ship);

    if (!placed) {
      alert("Cant place ships on the same square");
      return;
    }

    this.currentPlacement.shipType++;

    this.currentPlayer.render();

    if (this.currentPlacement.shipType >= this.shipsToPlace.length) {
      this.state = "playing";
      this.render();
      return;
    }
  }

  highlightPlacement(coords) {
    let highlightShip = this.calibrate(
      new Ship(
        this.shipsToPlace[this.currentPlacement.shipType],
        { x: coords.x, y: coords.y },
        this.currentPlacement.axis
      )
    );

    this.currentPlacement.ship = highlightShip;

    this.currentPlayer.render(highlightShip.occupied);
  }

  highlightSquare(coords) {
    if (coords.player == this.turn + 1) {
      return;
    }

    this.otherPlayer.render([coords]);
  }

  highlight(coords) {
    if (this.state === "placement") {
      this.highlightPlacement(coords);
    } else {
      this.highlightSquare(coords);
    }
  }

  changeAxis() {
    if (this.currentPlacement.axis == "x") {
      this.currentPlacement.axis = "y";
    } else {
      this.currentPlacement.axis = "x";
    }
  }

  render() {
    this.player1.render();
    this.player2.render();
  }
}
