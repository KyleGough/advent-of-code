import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseNetwork } from './day08.helper';
import { lcm } from '@utilities/math';

export const day08p2 = (input: string) => {
  const instructions = input.split('\n\n')[0].split('');
  const network = parseNetwork(input.split('\n\n')[1]);

  const endsWithA = Object.keys(network).filter((i) => i.endsWith('A'));

  const countSteps = (start: string) => {
    let steps = 0;
    let current = start;

    while (!current.endsWith('Z')) {
      const instruction = instructions[steps % instructions.length];
      current = network[current][instruction === 'L' ? 0 : 1];
      steps++;
    }

    return steps;
  };

  const stepCounts = endsWithA.map(countSteps).sort((a, b) => b - a);

  const finalLCM = stepCounts.reduce(
    (prev, curr) => lcm(prev, curr),
    stepCounts[0]
  );

  return finalLCM;
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // 9064949303801
