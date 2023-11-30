import Player from "./Player";

export default class Computer extends Player {
  constructor(drawBoard) {
    super("Computer", drawBoard);
    this.targets = [];
    this.shotRecord = [];
    this.fromPotentials = false;
  }

  getRandomCoord() {
    return {
      x: Math.floor(Math.random() * this.enemyBoard.width),
      y: Math.floor(Math.random() * this.enemyBoard.height),
    };
  }

  hasShot(coord) {
    const found = this.shotRecord.findIndex(
      (recorded) => recorded.x == coord.x && recorded.y == coord.y
    );

    if (found == -1) {
      return false;
    } else {
      return true;
    }
  }

  getShootCoord() {
    let alreadyShot;
    let shootCoord;
    do {
      shootCoord = this.getRandomCoord();
      alreadyShot = this.hasShot(shootCoord);
    } while (alreadyShot);

    return shootCoord;
  }

  shoot() {
    if (!this.enemyBoard) {
      return;
    }

    let target;
    if (this.targets.length === 0) {
      // No targets therefore shoot a random shootable coord
      target = this.getShootCoord();
    } else {
      // shoot a target square
      target = this.targets.pop();
    }
    let result = this.enemyBoard.takeShot(target.x, target.y);
    if (result == true) {
      let newTargets = [
        { x: target.x + 1, y: target.y },
        { x: target.x, y: target.y + 1 },
        { x: target.x - 1, y: target.y },
        { x: target.x, y: target.y - 1 },
      ];
      this.fromPotentials = true;
      newTargets.forEach((newTarget) => {
        if (
          newTarget.x >= 0 &&
          newTarget.x < this.enemyBoard.width &&
          newTarget.y >= 0 &&
          newTarget.y < this.enemyBoard.height &&
          !this.hasShot(newTarget)
        ) {
          this.targets.push(newTarget);
        }
      });
    }

    this.shotRecord.push(target);
    return result;
  }
}
