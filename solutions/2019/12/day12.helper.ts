import { sum } from '@utilities/reduce';
import { matchNumbers } from '@utilities/string';

type Vector = [number, number, number];

export const parseMoon = (input: string): Moon => {
  return new Moon(matchNumbers(input) as Vector);
};

export class Moon {
  pos: Vector;
  vel: Vector;

  constructor(pos: Vector) {
    this.pos = pos;
    this.vel = [0, 0, 0];
  }

  attract(other: Moon) {
    for (let i = 0; i < 3; i++) {
      if (this.pos[i] < other.pos[i]) {
        this.vel[i] += 1;
        other.vel[i] -= 1;
      } else if (this.pos[i] > other.pos[i]) {
        this.vel[i] -= 1;
        other.vel[i] += 1;
      }
    }
  }

  move() {
    for (let i = 0; i < 3; i++) {
      this.pos[i] += this.vel[i];
    }
  }

  getTotalEnergy(): number {
    const potentialEnergy = this.pos.map(Math.abs).reduce(sum, 0);
    const kineticEnergy = this.vel.map(Math.abs).reduce(sum, 0);
    return potentialEnergy * kineticEnergy;
  }
}

export const runTimestep = (moons: Moon[]): Moon[] => {
  // Calculate gravitation attraction between moons.
  for (let i = 0; i < moons.length - 1; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      moons[i].attract(moons[j]);
    }
  }

  // Move the moves according to their current velocity.
  for (const moon of moons) {
    moon.move();
  }

  return moons;
};
