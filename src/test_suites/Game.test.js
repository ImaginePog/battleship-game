import Game from "../modules/Game";

describe("Game basic tests", () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });

  test("Game's board have correct width and height", () => {
    expect(game.width).toBe(10);
    expect(game.height).toBe(10);
  });

  test("Games are initialized with correct board", () => {
    const game = new Game();
    expect(game.board).toHaveLength(10);
    expect(game.board[0]).toHaveLength(10);
  });
});
