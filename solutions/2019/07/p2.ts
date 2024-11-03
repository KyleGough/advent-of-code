import { getPuzzle } from '@utilities/getPuzzle';
import { permutations } from '@utilities/permutations';
import { run } from '@utilities/run';
import { Intcode } from '../05/day05.helper';
import { modulo } from '@utilities/modulo';

export const day07p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  const combos = permutations([5, 6, 7, 8, 9]);
  let maxThrust = 0;

  for (const combo of combos) {
    const programs = Array(5)
      .fill(0)
      .map(() => new Intcode(nums));
    const inputs = combo.map((c) => [c]);
    inputs[0].push(0);

    let amplifier = 0;
    let thrust = 0;

    while (programs[amplifier].ip < nums.length) {
      const output = programs[amplifier].awaitOutput(inputs[amplifier]);

      if (programs[amplifier].halt) {
        break;
      }

      thrust = output;
      amplifier = modulo(amplifier + 1, 5);
      inputs[amplifier].push(output);
    }

    if (thrust > maxThrust) {
      maxThrust = thrust;
    }
  }

  return maxThrust;
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 3745599
