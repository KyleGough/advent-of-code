import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day13p1 = (input: string) => {
  const lines = input.split('\n');
  const earliestTime = parseInt(lines[0]);
  const buses = lines[1]
    .split(',')
    .filter((i) => i !== 'x')
    .map(Number);

  let minWaitTime = Number.MAX_VALUE;
  let minWaitBus = 0;

  for (const bus of buses) {
    const fullJourneys = Math.floor(earliestTime / bus);
    const waitTime = (fullJourneys + 1) * bus - earliestTime;
    if (waitTime < minWaitTime) {
      minWaitTime = waitTime;
      minWaitBus = bus;
    }
  }

  return minWaitBus * minWaitTime;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // 4135
