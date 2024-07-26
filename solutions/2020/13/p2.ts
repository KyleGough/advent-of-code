import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day13p2 = (input: string) => {
  const buses = input.split('\n')[1].split(',');

  let period = 1;
  let t = 0;

  for (let i = 0; i < buses.length; i++) {
    if (buses[i] === 'x') continue;

    const bus = parseInt(buses[i]);
    let matchFound = false;
    while (!matchFound) {
      if ((t + i) % bus === 0) {
        matchFound = true;
        period *= bus;
      } else {
        t += period;
      }
    }
  }

  return t;
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 640856202464541
