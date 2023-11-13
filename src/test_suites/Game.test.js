import Game from "../modules/Game";
import Player from "../modules/Player";

describe("Game basic tests", () => {
  let game;
  beforeEach(() => {
    const player1 = new Player("Player1");
    const player2 = new Player("Noob");
    game = new Game(player1, player2);
  });

  test("Game has two players", () => {
    expect(game.players).toHaveLength(2);
  });

  test("Game keeps track of turns", () => {
    expect(game.getCurrentPlayer().name).toBe("Player1");
    game.nextTurn();
    expect(game.getCurrentPlayer().name).toBe("Noob");
  });
});
