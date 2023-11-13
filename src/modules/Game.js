import Player from "./Player";

export default class Game {
  constructor(player1, player2) {
    this.players = [];
    this.players.push(new Player(player1));
    this.players.push(new Player(player2));
  }
}
