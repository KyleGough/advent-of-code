import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getStartingStacks } from './day05.helper';

export const day05p2 = (input: string) => {
  const [stacks, procedures] = input.split('\n\n');
  const startingStacks = getStartingStacks(stacks);
  const lines = procedures.split('\n');
  const crates = startingStacks.map((stack) => stack.split(''));

  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].split(' ');
    const n = parseInt(words[1]);
    const from = parseInt(words[3]);
    const to = parseInt(words[5]);
    crates[to - 1].push(...crates[from - 1].splice(-n));
  }

  return crates.map((stack) => stack[stack.length - 1]).join('');
};

const input = getPuzzle(__dirname).input;
run(() => day05p2(input)); // ZFSJBPRFP
