import { max, min } from '@utilities/reduce';

export type Particle = [px: number, py: number, vx: number, vy: number];

export const parseParticle = (input: string): Particle => {
  const nums = input.matchAll(/-?\d+/g);
  return [...nums].map((i) => parseInt(i[0])) as Particle;
};

export const getParticleSpan = (
  particles: Particle[],
  axis: 'x' | 'y'
): [number, number] => {
  const heights = particles.map((i) => i[axis === 'x' ? 0 : 1]);
  const minSpan = heights.reduce(min, Number.MAX_SAFE_INTEGER);
  const maxSpan = heights.reduce(max, Number.MIN_SAFE_INTEGER);
  return [minSpan, maxSpan];
};

export const getMessageSteps = (particles: Particle[]): number => {
  let steps = 0;
  let messageFound = false;
  let previousSpan = Number.MAX_SAFE_INTEGER;

  while (!messageFound) {
    // Recalculate positions.
    particles = particles.map((p) => [p[0] + p[2], p[1] + p[3], p[2], p[3]]);
    // Check if height span has increased.
    const [minHeight, maxHeight] = getParticleSpan(particles, 'y');
    if (maxHeight - minHeight > previousSpan) {
      messageFound = true;
    }
    previousSpan = maxHeight - minHeight;
    steps += 1;
  }

  return steps - 1;
};
