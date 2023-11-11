const shipTypeLengths = {
  Carrier: 5,
  Battle: 4,
  Destroyer: 3,
  Submarine: 3,
  Patrol: 2,
};

export default class Ship {
  constructor(type) {
    this.type = type || "Carrier";
    this.length = this.health = shipTypeLengths[this.type];
  }

  hit() {
    this.health--;
  }
}
