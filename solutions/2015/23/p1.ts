import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { turingLock } from './day23.helper';

export const day23p1 = (input: string) => {
  const instructions = input.split('\n');

  const register: Record<string, number> = {
    a: 0,
    b: 0,
  };

  return turingLock(instructions, register);
};

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 184
