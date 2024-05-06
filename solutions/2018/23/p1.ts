import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';

export const day23p1 = (input: string) => {
  const signals = input.split('\n').map(matchNumbers);

  // Iterate over signals to find the maximum signal range.
  let maxRange = 0;
  let maxRangeSignal: number[] = [];
  for (let i = 0; i < signals.length; i++) {
    if (signals[i][3] > maxRange) {
      maxRange = signals[i][3];
      maxRangeSignal = signals[i];
    }
  }

  // Iterate over signals to find if in range of chosen signal.
  let count = 0;
  for (const signal of signals) {
    const dx = Math.abs(maxRangeSignal[0] - signal[0]);
    const dy = Math.abs(maxRangeSignal[1] - signal[1]);
    const dz = Math.abs(maxRangeSignal[2] - signal[2]);
    if (dx + dy + dz <= maxRangeSignal[3]) {
      count += 1;
    }
  }

  return count;
};

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 481
