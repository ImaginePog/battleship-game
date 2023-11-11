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
