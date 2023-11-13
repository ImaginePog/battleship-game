import Player from "../modules/Player";

describe("Player basic tests", () => {
  test("Players have a name", () => {
    const player = new Player("name");
    expect(player.name).toBe("name");
  });

  test("Players have a gameboard", () => {
    const player = new Player("name2");
    expect(player.board).toBeDefined();
  });
});

describe("Player advanced tests", () => {
  test("Players can create and place ships on their board", () => {
    const player = new Player("name1");
    expect(player.placeShip).toBeDefined();
  });
});
