import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Particle, parseParticle, Dimension } from './day20.helper';

type Time = 'All' | number[];

const collisionTime = (p0: Particle, p1: Particle, dim: Dimension): Time => {
  const p0a = p0.acceleration.get(dim);
  const p1a = p1.acceleration.get(dim);
  const p0v = p0.velocity.get(dim);
  const p1v = p1.velocity.get(dim);
  const p0p = p0.position.get(dim);
  const p1p = p1.position.get(dim);

  if (p0a === p1a && p0v === p1v) {
    return p0p === p1p ? 'All' : [];
  } else if (p0a === p1a) {
    return [(p1p - p0p) / (p0v - p1v)].filter(validTimes);
  }

  const a = (p0a - p1a) / 2;
  const b = p0a / 2 + p0v - p1a / 2 - p1v;
  const c = p0p - p1p;

  const discriminant = Math.pow(b, 2) - 4 * a * c;
  if (discriminant < 0) return [];

  const solutions = [
    (-b + Math.sqrt(discriminant)) / (2 * a),
    (-b - Math.sqrt(discriminant)) / (2 * a),
  ];

  return solutions.filter(validTimes);
};

const validTimes = (time: number): boolean =>
  time >= 0 && Number.isInteger(time);

const timeIntersect = (t1: Time, t2: Time): Time => {
  if (t1 === 'All' && t2 === 'All') return 'All';
  if (t1 === 'All') return t2;
  if (t2 === 'All') return t1;
  return t1.filter((i) => t2.includes(i));
};

// Gets a list of times that the particles collide considering all dimensions.
const collisionTimeAllDimensions = (p0: Particle, p1: Particle): number[] => {
  const dims: Dimension[] = ['x', 'y', 'z'];
  const intersectionTimes = dims
    .map((dim) => collisionTime(p0, p1, dim))
    .reduce(timeIntersect, 'All');
  return intersectionTimes === 'All' ? [0] : intersectionTimes;
};

export const day20p2 = (input: string) => {
  const particles = input
    .split('\n')
    .map((i, index) => parseParticle(i, index));

  const collisions: Record<string, number[][]> = {};
  const particlePool: Set<number> = new Set(particles.map((i) => i.id));

  // Get list of all collisions sorted by time.
  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const times = collisionTimeAllDimensions(particles[i], particles[j]);
      for (const time of times) {
        if (collisions[time]) {
          collisions[time].push([i, j]);
        } else {
          collisions[time] = [[i, j]];
        }
      }
    }
  }

  for (const time of Object.keys(collisions)) {
    const removals: Set<number> = new Set();

    for (let i = 0; i < collisions[time].length; i++) {
      const [p0, p1] = collisions[time][i];
      if (particlePool.has(p0) && particlePool.has(p1)) {
        removals.add(p0);
        removals.add(p1);
      }
    }

    for (const removeParticle of [...removals]) {
      particlePool.delete(removeParticle);
    }
  }

  return particlePool.size;
};

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 438
