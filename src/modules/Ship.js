const shipTypeLengths = {
  Carrier: 5,
  Battle: 4,
  Destroyer: 3,
  Submarine: 3,
  Patrol: 2,
};

export default class Ship {
  constructor(type, position) {
    this.type = type || "Carrier";
    this.length = this.health = shipTypeLengths[this.type];
    this.position = position || { x: 0, y: 0 };
  }

  hit() {
    if (!this.sunk) this.health--;
  }

  get sunk() {
    return this.health <= 0;
  }
}
