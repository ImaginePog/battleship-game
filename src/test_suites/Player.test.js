import Player from "../modules/Player";

describe("Player basic tests", () => {
  test("Players have a name", () => {
    const player = new Player("name");
    expect(player.name).toBe("name");
  });

  test("Players have a gameboard", () => {
    const player = new Player("name2");
    expect(player.gameboard).toBeDefined();
  });
});

describe("Player advanced tests", () => {
  test("Players can create and place ships on their board", () => {
    const player = new Player("name1");
    expect(player.placeShip).toBeDefined();
  });

  test("Players can shoot a shot on other players", () => {
    const player1 = new Player("player1");
    const player2 = new Player("player2");

    player1.shoot(player2, 0, 2);
    expect(player2.gameboard.board).toEqual([
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      ["X", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
  });
});
