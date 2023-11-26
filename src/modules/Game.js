import App from "./App";
import Computer from "./Computer";
import DOM from "./DOM";
import Player from "./Player";
import Ship from "./Ship";

export default class Game {
  constructor(type, player1Name, player2Name) {
    const player1Board = DOM.getElement(".player1-board");
    player1Board.innerText = "";
    this.player1 = new Player(player1Name, player1Board);

    const player2Board = DOM.getElement(".player2-board");
    player2Board.innerText = "";

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

    this.infoOutput = DOM.getElement(".info-container");

    this.state = "placement";
    this.updatePlacementInfo();
    this.currentPlayer.render();
  }

  updateInfo(message) {
    this.infoOutput.innerText = message;
  }

  updatePlacementInfo() {
    let message = `Currently placing: ${
      this.shipsToPlace[this.currentPlacement.shipType]
    } ship`;

    if (this.currentPlacement.axis === "x") {
      message += " Horizontally";
    } else {
      message += " Vertically";
    }
    this.updateInfo(message);
  }

  hasEnded() {
    return this.otherPlayer.lost();
  }

  nextTurn() {
    // CheckEnd
    if (this.hasEnded()) {
      this.state = "over";
      App.end(this.currentPlayer, this.turn);
      return;
    }
    this.turn = (this.turn + 1) % 2;

    if (this.turn == 0) {
      this.state = "choice";
      this.updateInfo("Choose a square to shoot at captain!");
      this.currentPlayer = this.player1;
      this.otherPlayer = this.player2;
    } else {
      this.state = "computer";
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
    setTimeout(() => {
      this.updateInfo("The computer is making its move...brace!!");
      setTimeout(() => {
        const result = this.currentPlayer.shoot();
        if (result == true) {
          this.updateInfo("Oh no! It hit our ship!");
        } else {
          this.updateInfo("Phew! It missed!");
        }

        this.render();
        setTimeout(() => {
          this.nextTurn();
        }, 2000);
      }, 1000);
    }, 1000);
  }

  play(coords) {
    if (coords.player == this.turn + 1) {
      return;
    }

    const result = this.currentPlayer.shoot(coords.x, coords.y);

    if (result == true) {
      this.updateInfo("Nice shot captain!!");
    } else if (result === -1) {
      this.updateInfo("Already shot there captain...");
      // Cant shoot
      return;
    } else {
      this.updateInfo("Oh no! We missed!");
    }

    this.render();
    this.nextTurn();
  }

  getRandomAxis() {
    const rand = Math.random();
    if (rand >= 0.5) {
      return "x";
    } else {
      return "y";
    }
  }

  getRandomCoords() {
    return {
      x: Math.floor(Math.random() * this.width),
      y: Math.floor(Math.random() * this.height),
    };
  }

  computerPlacement() {
    this.shipsToPlace.forEach((shipType) => {
      let placed = false;
      while (!placed) {
        let ship = this.calibrate(
          new Ship(shipType, this.getRandomCoords(), this.getRandomAxis())
        );
        placed = this.otherPlayer.placeShip(ship);
      }
    });
  }

  async place() {
    const placed = this.currentPlayer.placeShip(this.currentPlacement.ship);

    if (!placed) {
      alert("Cant place ships on the same square");
      return;
    }

    this.currentPlacement.shipType++;
    this.updatePlacementInfo();

    this.currentPlayer.render();

    // Placement is over
    if (this.currentPlacement.shipType >= this.shipsToPlace.length) {
      this.computerPlacement();
      this.state = "choice";
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

    this.currentPlayer.render(true, highlightShip.occupied);
  }

  highlightSquare(coords) {
    if (coords.player == this.turn + 1) {
      return;
    }

    this.otherPlayer.render(false, [coords]);
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
    this.updatePlacementInfo();
  }

  render() {
    this.player1.render(true);
    this.player2.render(false);
  }
}
