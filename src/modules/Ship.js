const shipTypeLengths = {
  Carrier: 5,
  Battle: 4,
  Destroyer: 3,
  Submarine: 3,
  Patrol: 2,
};

export default class Ship {
  constructor(type, position, axis) {
    this.type = type || "Carrier";
    this.token = this.type[0];
    this.length = this.health = shipTypeLengths[this.type];
    this.position = position || { x: 0, y: 0 };
    this.axis = axis || "x";

    this.occupied = this.calculateOcuppied();
  }

  calculateOcuppied() {
    const spaces = [this.position];
    for (let i = 1; i < this.length; ++i) {
      const lastPos = spaces[spaces.length - 1];
      if (this.axis === "x") {
        spaces.push({ x: lastPos.x + 1, y: lastPos.y });
      } else {
        spaces.push({ x: lastPos.x, y: lastPos.y + 1 });
      }
    }
    return spaces;
  }

  hit() {
    if (!this.sunk) this.health--;
  }

  get sunk() {
    return this.health <= 0;
  }
}
