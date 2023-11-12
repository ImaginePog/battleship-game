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

describe("Game advanced tests", () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });

  test("Games can place ships", () => {
    expect(game.placeShip).toBeDefined();
  });

  test("Games places ships correctly", () => {
    game.placeShip("Battle", { x: 0, y: 0 }, "x");
    expect(game.ships[game.ships.length - 1].occupied).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);
  });

  test("Game calibrates ships that go out of bounds in the x axis", () => {
    game.placeShip("Battle", { x: 9, y: 0 }, "x");
    expect(game.ships[game.ships.length - 1].occupied).toEqual([
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 9, y: 0 },
    ]);
  });

  test("Game calibrates ships that go out of bounds in the y axis", () => {
    game.placeShip("Battle", { x: 0, y: 9 }, "y");
    expect(game.ships[game.ships.length - 1].occupied).toEqual([
      { x: 0, y: 6 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
    ]);
  });
});
