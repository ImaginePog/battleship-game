import Player from "./Player";

export default class Game {
  constructor(player1, player2) {
    this.players = [];
    this.players.push(new Player(player1));
    this.players.push(new Player(player2));
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
