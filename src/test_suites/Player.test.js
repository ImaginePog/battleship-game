describe("Player basic tests", () => {
  test("Players have a name", () => {
    const player = Player("name");
    expect(player.name).toBe("name");
  });

  test("Players have a gameboard", () => {
    const player = Player("name2");
    expect(player.board).toBeDefined();
  });
});
