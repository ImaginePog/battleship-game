export default class Game {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.turn = 0;
  }

  nextTurn() {
    // Do other things before changing the turn
    this.turn = (this.turn + 1) % this.players.length;
  }

  getCurrentPlayer() {
    return this.players[this.turn];
  }
}
