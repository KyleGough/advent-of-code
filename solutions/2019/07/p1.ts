import { getPuzzle } from '@utilities/getPuzzle';
import { permutations } from '@utilities/permutations';
import { run } from '@utilities/run';
import { Intcode } from '../05/day05.helper';

export const day07p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const combos = permutations([0, 1, 2, 3, 4]);
  let maxThrust = 0;

  for (const combo of combos) {
    let thrust = 0;

    for (let i = 0; i < 5; i++) {
      thrust = new Intcode(nums).runProgram([combo[i], thrust]);
    }

    if (thrust > maxThrust) {
      maxThrust = thrust;
    }
  }

  return maxThrust;
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // 440880
