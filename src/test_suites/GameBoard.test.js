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

  test("Gameboards can take shots from another player or something", () => {
    expect(gameboard.takeShot).toBeDefined();
  });

  test("Gameboards update board with missed shots at correct positions", () => {
    const imaginaryShot = { x: 3, y: 3 };
    gameboard.takeShot(imaginaryShot.x, imaginaryShot.y);

    expect(gameboard.board).toEqual([
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "X", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
  });

  test("Gameboards' ships take hits if the shot was on target", () => {
    gameboard.placeShip("Patrol", { x: 0, y: 0 }, "x");
    gameboard.takeShot(1, 0);

    expect(gameboard.ships[gameboard.ships.length - 1].health).toBe(1);

    gameboard.placeShip("Battle", { x: 0, y: 5 }, "x");
    gameboard.takeShot(0, 5);
    gameboard.takeShot(3, 5);
    expect(gameboard.ships[gameboard.ships.length - 1].health).toBe(2);
  });

  test("Gameboard sends messages about the shot (true: on target, false: missed, -1: cant shoot)", () => {
    gameboard.placeShip("Patrol", { x: 0, y: 0 }, "x");
    expect(gameboard.takeShot(1, 0)).toBe(true);

    expect(gameboard.takeShot(9, 9)).toBe(false);
    expect(gameboard.takeShot(9, 9)).toBe(-1);
  });

  test("Gameboard knows if all it's ships have sunk", () => {
    gameboard.placeShip("Patrol", { x: 0, y: 0 }, "x");
    gameboard.placeShip("Battle", { x: 0, y: 3 }, "x");

    gameboard.takeShot(0, 0);
    gameboard.takeShot(1, 0);

    gameboard.takeShot(0, 3);
    gameboard.takeShot(1, 3);
    gameboard.takeShot(2, 3);
    gameboard.takeShot(3, 3);

    expect(gameboard.areAllSunk()).toBe(true);
  });
});
