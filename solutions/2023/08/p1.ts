import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseNetwork } from './day08.helper';

export const day08p1 = (input: string) => {
  const instructions = input.split('\n\n')[0].split('');
  const network = parseNetwork(input.split('\n\n')[1]);

  let steps = 0;
  let current = 'AAA';

  while (current !== 'ZZZ') {
    const instruction = instructions[steps % instructions.length];
    current = network[current][instruction === 'L' ? 0 : 1];
    steps++;
  }

  return steps;
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 12737
