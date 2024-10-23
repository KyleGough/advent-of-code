import { getPuzzle } from '@utilities/getPuzzle';
import { permutations } from '@utilities/permutations';
import { run } from '@utilities/run';
import { intcodeComputerStep } from '../05/day05.helper';
import { modulo } from '@utilities/modulo';

export const day07p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  const combos = permutations([5, 6, 7, 8, 9]);
  let maxThrust = 0;

  for (const combo of combos) {
    const ips = [0, 0, 0, 0, 0];
    const inputs = combo.map((c) => [c]);
    inputs[0].push(0);

    let amplifier = 0;
    let thrust = 0;

    while (ips[amplifier] < nums.length) {
      const step = intcodeComputerStep(nums, inputs[amplifier], ips[amplifier]);

      if (step.halt) {
        break;
      }

      ips[amplifier] = step.ip;
      thrust = step.output;
      amplifier = modulo(amplifier + 1, 5);
      inputs[amplifier].push(step.output);
    }

    if (thrust > maxThrust) {
      maxThrust = thrust;
    }
  }

  return maxThrust;
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 3745599
