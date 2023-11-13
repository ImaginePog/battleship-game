import Game from "../modules/Game";

describe("Game basic tests", () => {
  test("Game has two players", () => {
    const game = new Game("Player1", "Noob");
    expect(game.players).toHaveLength(2);
  });
});
