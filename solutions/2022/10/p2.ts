import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day10p2 = (input: string) => {
  const instructions = input.split('\n');

  const display: string[][] = [];
  let pixelRow: string[] = [];

  let x = 1;
  let cycle = 0;

  // Start new pixel row.
  const nextRow = () => {
    if (cycle % 40 === 0 && cycle > 0) {
      display.push(pixelRow);
      pixelRow = [];
    }
  };

  const nextCycle = () => {
    nextRow();

    // Add new pixel to the display.
    if (Math.abs(x - (cycle % 40)) <= 1) {
      pixelRow.push('#');
    } else {
      pixelRow.push('.');
    }

    cycle++;
  };

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === 'noop') {
      nextCycle();
    } else {
      const addAmount = parseInt(instructions[i].split(' ')[1]);
      nextCycle();
      nextCycle();
      x += addAmount;
    }
  }

  nextRow();

  return display.map((i) => i.join('')).join('\n');
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // FBURHZCH
