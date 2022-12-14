import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

const nextCycle = (
  cycle: number,
  x: number,
  interestingSignals: number[]
): number => {
  cycle++;
  if (cycle % 40 === 20) {
    interestingSignals.push(x * cycle);
  }
  return cycle;
};

export const day10p1 = (input: string) => {
  const instructions = input.split('\n');

  let x = 1;
  let cycle = 0;
  const interestingSignals: number[] = [];

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === 'noop') {
      cycle = nextCycle(cycle, x, interestingSignals);
    } else {
      const addAmount = parseInt(instructions[i].split(' ')[1]);
      cycle = nextCycle(cycle, x, interestingSignals);
      cycle = nextCycle(cycle, x, interestingSignals);
      x += addAmount;
    }
  }

  return interestingSignals.reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 13720
