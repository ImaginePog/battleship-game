import Computer from "./Computer";
import DOM from "./DOM";
import EventHandler from "./EventHandler";

export default class Game {
  constructor(player1) {
    this.players = [player1, new Computer()];
    this.turn = 0;
    this.quit = false;
  }

  // Initialize the required stuff for game
  init() {
    DOM.load();
    EventHandler.listen();
    this.render();
  }

  // End the game if there was a condition
  // For now log the result
  checkEnd() {
    const playerToCheck = this.getOtherPlayer();
    this.quit = playerToCheck.lost();
    if (this.quit) {
      console.log(this.getCurrentPlayer().name + " HAS WON!!");
    }
  }

  nextTurn() {
    this.render();
    this.checkEnd();
    this.turn = (this.turn + 1) % this.players.length;
  }

  getCurrentPlayer() {
    return this.players[this.turn];
  }

  getOtherPlayer() {
    return this.players.filter(
      (player) => player.name !== this.getCurrentPlayer().name
    )[0];
  }

  update() {
    const currPlayer = this.getCurrentPlayer();
    const enemy = this.getOtherPlayer();

    if (currPlayer instanceof Computer) {
      // Do computer logic
      currPlayer.shoot(enemy);
      this.nextTurn();

      return;
    } else {
      // Player logic
      // Wait for coords
      const coords = EventHandler.getRecordedCoordinates();
      if (coords.player == this.turn + 1) {
        return;
      }

      if (coords.x && coords.y) {
        const result = currPlayer.shoot(enemy, coords.x, coords.y);

        if (result === -1) {
          return;
        }

        this.nextTurn();
      }
    }
  }

  render() {
    this.players.forEach((player, index) => {
      const playerName = DOM.getElement(`.player${index + 1}-name`);
      playerName.innerText = player.name;

      const board = DOM.getElement(`.player${index + 1}-board`);
      board.innerText = "";

      for (let y = 0; y < player.gameboard.width; ++y) {
        const row = document.createElement("div");
        row.classList.add("game-row");
        for (let x = 0; x < player.gameboard.height; ++x) {
          const cell = document.createElement("div");
          cell.classList.add("game-cell");
          cell.dataset.x = x;
          cell.dataset.y = y;

          const cellType = player.gameboard.getSpace(x, y);
          switch (cellType) {
            // empty space
            case " ":
              cell.classList.add("empty-cell");
              break;
            // Missed shot
            case "X":
              cell.classList.add("missed-cell");
              break;
            // Shot
            case "S":
              cell.classList.add("shot-cell");
              break;
          }
          row.append(cell);
        }
        board.append(row);
      }
    });
  }

  loop() {
    if (this.quit) {
      return;
    }

    requestAnimationFrame(() => {
      this.loop();
    });

    this.update();
  }
}
