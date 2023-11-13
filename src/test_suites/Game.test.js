describe("Game basic tests", () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("Game has two players", () => {
    expect(game.players).toHaveLength(2);
  });
});
