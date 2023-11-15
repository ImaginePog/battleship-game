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

  update() {}

  render() {}

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
