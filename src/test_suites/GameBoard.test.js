import GameBoard from "../modules/GameBoard";

describe("Gameboard basic tests", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new GameBoard();
  });

  test("Gameboard has correct width and height", () => {
    expect(gameboard.width).toBe(10);
    expect(gameboard.height).toBe(10);
  });
});

describe("Gameboard advanced tests", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new GameBoard();
  });

  test("Gameboard creates board correctly", () => {
    expect(gameboard.board).toEqual([
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

  test("Gameboard can return a space from the board", () => {
    expect(gameboard.getSpace(0, 5)).toBeDefined();
  });

  test("Gameboard can update a space with a token", () => {
    gameboard.setSpace(5, 0, "B");

    expect(gameboard.board).toEqual([
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

  test("Gameboard can place ships", () => {
    expect(gameboard.placeShip).toBeDefined();
  });

  test("Gameboard places ships correctly", () => {
    gameboard.placeShip("Battle", { x: 0, y: 0 }, "x");
    expect(gameboard.ships[gameboard.ships.length - 1].occupied).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);

    expect(gameboard.board).toEqual([
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

  test("Gameboard calibrates ships that go out of bounds in the x axis", () => {
    gameboard.placeShip("Battle", { x: 9, y: 0 }, "x");
    expect(gameboard.ships[gameboard.ships.length - 1].occupied).toEqual([
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 9, y: 0 },
    ]);
  });

  test("Gameboard calibrates ships that go out of bounds in the y axis", () => {
    gameboard.placeShip("Battle", { x: 0, y: 9 }, "y");
    expect(gameboard.ships[gameboard.ships.length - 1].occupied).toEqual([
      { x: 0, y: 6 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
    ]);
  });

  test("Gameboard won't allow ships to be placed over other ships", () => {
    gameboard.placeShip("Patrol", { x: 0, y: 0 }, "x");
    expect(gameboard.placeShip("Patrol", { x: 0, y: 0 }, "x")).toBe(false);
    expect(gameboard.placeShip("Battle", { x: 1, y: 0 }, "y")).toBe(false);
    expect(gameboard.placeShip("Battle", { x: 2, y: 0 }, "y")).toBe(true);
  });
});
