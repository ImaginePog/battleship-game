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

  test("Game creates board correctly", () => {
    expect(game.board).toEqual([
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
  });

  test("Games can return a space from the board", () => {
    expect(game.getSpace(0, 5)).toBeDefined();
  });

  test("Games can update a space with a token", () => {
    game.setSpace(5, 0, "B");

    expect(game.board).toEqual([
      [" ", " ", " ", " ", " ", "B", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
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

    expect(game.board).toEqual([
      ["B", "B", "B", "B", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
  });

  test("Games calibrates ships that go out of bounds in the x axis", () => {
    game.placeShip("Battle", { x: 9, y: 0 }, "x");
    expect(game.ships[game.ships.length - 1].occupied).toEqual([
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 9, y: 0 },
    ]);
  });

  test("Games calibrates ships that go out of bounds in the y axis", () => {
    game.placeShip("Battle", { x: 0, y: 9 }, "y");
    expect(game.ships[game.ships.length - 1].occupied).toEqual([
      { x: 0, y: 6 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
    ]);
  });

  test("Games won't allow ships to be placed over other ships", () => {
    game.placeShip("Patrol", { x: 0, y: 0 }, "x");
    expect(game.placeShip("Patrol", { x: 0, y: 0 }, "x")).toBe(false);
    expect(game.placeShip("Battle", { x: 1, y: 0 }, "y")).toBe(false);
    expect(game.placeShip("Battle", { x: 2, y: 0 }, "y")).toBe(true);
  });
});
