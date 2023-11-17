import Game from "../modules/Game";

describe("Game basic tests", () => {
  let game;
  beforeEach(() => {
    game = new Game("Player1");
  });

  test("Game has two players", () => {
    expect(game.players).toHaveLength(2);
  });

  test("Game keeps track of turns", () => {
    expect(game.getCurrentPlayer().name).toBe("Player1");
    game.nextTurn();
    expect(game.getCurrentPlayer().name).toBe("Computer");
  });
});
