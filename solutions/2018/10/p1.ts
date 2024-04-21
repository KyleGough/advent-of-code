import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  Particle,
  parseParticle,
  getMessageSteps,
  getParticleSpan,
} from './day10.helper';

export const day10p1 = (input: string) => {
  const particles = input.split('\n').map(parseParticle);
  const steps = getMessageSteps(particles);
  const messageParticles = particles.map(
    (p) => [p[0] + steps * p[2], p[1] + steps * p[3], p[2], p[3]] as Particle
  );

  return renderMessage(messageParticles);
};

const renderMessage = (particles: Particle[]) => {
  const [minX, maxX] = getParticleSpan(particles, 'x');
  const [minY, maxY] = getParticleSpan(particles, 'y');
  const message = [];

  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      if (particles.findIndex((p) => p[0] === x && p[1] === y) > -1) {
        row.push('#');
      } else {
        row.push('.');
      }
    }
    message.push(row.join(''));
  }

  return message.join('\n');
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // GGLZLHCE
