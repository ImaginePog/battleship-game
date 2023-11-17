import Game from "../modules/Game";

describe("Game basic tests", () => {
  let game;
  beforeEach(() => {
    game = new Game("singleplayer", "Player1");
  });

  test("Game keeps track of turns", () => {
    expect(game.player1.name).toBe("Player1");
    game.nextTurn();
    expect(game.player2.name).toBe("Computer");
  });
});
