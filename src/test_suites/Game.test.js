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
});
  });
});
