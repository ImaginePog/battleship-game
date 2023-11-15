export default class Game {
  constructor(player1) {
    this.players = [player1, new Computer()];
    this.turn = 0;
    this.quit = false;
  }

  }

  nextTurn() {
    // Do other things before changing the turn
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
