import Computer from "./Computer";
import DOM from "./DOM";
import EventHandler from "./EventHandler";
import Player from "./Player";

export default class Game {
  constructor(type, player1Name, player2Name) {
    this.player1 = new Player(player1Name);

    if (type == "singleplayer") {
      this.player2 = new Computer();
    } else {
      this.player2 = new Player(player2Name);
    }

    this.currentPlayer = this.player1;

    this.turn = 0;
  }

  nextTurn() {
    this.turn = (this.turn + 1) % 2;

    if (this.turn == 0) {
      this.currentPlayer = this.player1;
    } else {
      this.currentPlayer = this.player2;
    }
  }
}
