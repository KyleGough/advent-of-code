import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { getGuardData, GuardData, parseLog, sortLog } from './day04.helper';

export const day04p1 = (input: string) => {
  const logs = input.split('\n').map(parseLog).sort(sortLog);
  const data = getGuardData(logs);
  const sleepyGuard = getMostSleepy(data);
  const commonMinute = getMaxValue(data[sleepyGuard])[0];
  return sleepyGuard * commonMinute;
};

const getMaxValue = (record: Record<number, number>): [number, number] => {
  let maxKey = 0;
  let maxValue = 0;

  for (const [key, value] of Object.entries(record)) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = parseInt(key);
    }
  }

  return [maxKey, maxValue];
};

const getMostSleepy = (data: GuardData): number => {
  let currentMax = 0;
  let sleepyId = 0;

  for (const [id, record] of Object.entries(data)) {
    const count = Object.values(record).reduce(sum, 0);
    if (count > currentMax) {
      currentMax = count;
      sleepyId = parseInt(id);
    }
  }

  return sleepyId;
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 12169
