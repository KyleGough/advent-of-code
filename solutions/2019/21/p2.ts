import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Intcode } from '../05/day05.helper';
import { parseSpringScript } from './day21.helper';

export const day21p2 = (input: string) => {
  const nums = input.split(',').map(Number);

  // Implementation of: NOT A OR (D AND H AND (NOT B OR NOT C))
  const springScript = [
    'NOT B T',
    'NOT C J',
    'OR J T',
    'AND D T',
    'AND H T',
    'NOT A J',
    'OR T J',
    'RUN',
  ];

  const asciiInput = parseSpringScript(springScript);

  return new Intcode(nums).runProgram(asciiInput);
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // 1142805439
