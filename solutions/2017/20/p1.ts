import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Vec, Particle, parseParticle } from './day20.helper';

const compareVector = (a: Vec, b: Vec): number => {
  const aSize = a.size();
  const bSize = b.size();

  if (aSize === bSize) {
    return 0;
  } else if (aSize > bSize) {
    return 1;
  } else {
    return -1;
  }
};

const compareParticles = (a: Particle, b: Particle): number => {
  const accelerationComparison = compareVector(a.acceleration, b.acceleration);
  if (accelerationComparison !== 0) return accelerationComparison;

  const velocityComparison = compareVector(a.velocity, b.velocity);
  if (velocityComparison !== 0) return velocityComparison;

  return compareVector(a.position, b.position);
};

export const day20p1 = (input: string) => {
  const particles = input
    .split('\n')
    .map((i, index) => parseParticle(i, index));

  particles.sort(compareParticles);

  return particles[0].id;
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 161
