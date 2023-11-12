import Ship from "../modules/Ship";

describe("Ship basic tests", () => {
  test("Ships have types", () => {
    const shippy = new Ship("Battle");
    expect(shippy.type).toBe("Battle");
  });

  test("Ships have default types", () => {
    const shippy = new Ship();
    expect(shippy.type).toBeDefined();
    expect(shippy.length).toBeDefined();
  });

  test("Ships have lengths", () => {
    const shippy = new Ship("Battle");
    expect(shippy.length).toBeDefined();
  });

  test("Ship's types and length match", () => {
    const patrolShip = new Ship("Patrol");
    const carrierShip = new Ship("Carrier");

    expect(patrolShip.length).toBe(2);
    expect(carrierShip.length).toBe(5);
  });
});

describe("Ship advanced tests", () => {
  test("Ships can take hits", () => {
    const shippy = new Ship("Battle");
    shippy.hit();
    shippy.hit();

    expect(shippy.health).toBe(2);
  });

  test("Ships can sink", () => {
    const shippy = new Ship("Patrol");

    expect(shippy.sunk).toBe(false);
    shippy.hit();
    shippy.hit();
    expect(shippy.sunk).toBe(true);
  });

  test("Sunken ships can't take hits", () => {
    const shippy = new Ship("Patrol");
    shippy.hit();
    shippy.hit();
    expect(shippy.sunk).toBe(true);
    shippy.hit();
    expect(shippy.health).toBe(0);
  });

  test("Ships take positions", () => {
    const pos = { x: 2, y: 3 };
    const shippy = new Ship("Patrol", pos);
    expect(shippy.position).toEqual(pos);
  });

  test("Ships take axis", () => {
    const pos = { x: 2, y: 3 };
    const axis = "x";

    const shippy = new Ship("Patrol", pos, axis);
    expect(shippy.axis).toEqual(axis);
  });

  test("Ships have tokens to represent in the board", () => {
    const pos = { x: 2, y: 3 };
    const axis = "x";

    const shippy = new Ship("Patrol", pos, axis);
    expect(shippy.token).toBe("P");
  });

  test("Ships occupy spaces according to their length", () => {
    const pos = { x: 2, y: 3 };
    const axis = "x";

    const shippy = new Ship("Patrol", pos, axis);
    expect(shippy.occupied).toHaveLength(shippy.length);

    const shippy2 = new Ship("Destroyer", pos, axis);
    expect(shippy2.occupied).toHaveLength(shippy2.length);
  });

  test("Spaces occupied are correct according to position and axis", () => {
    const pos = { x: 0, y: 0 };
    const axis = "x";

    const shippy = new Ship("Patrol", pos, axis);
    expect(shippy.occupied).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);
  });
});
