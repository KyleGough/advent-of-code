import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getGuardData, GuardData, parseLog, sortLog } from './day04.helper';

export const day04p2 = (input: string) => {
  const logs = input.split('\n').map(parseLog).sort(sortLog);
  return strategy2(getGuardData(logs));
};

const strategy2 = (guardData: GuardData): number => {
  const minuteMax: Record<number, number[]> = {};
  for (let i = 0; i < 60; i++) {
    minuteMax[i] = [0, 0];
  }

  for (const [id, record] of Object.entries(guardData)) {
    for (const [minute, count] of Object.entries(record)) {
      if (count > minuteMax[parseInt(minute)][1]) {
        minuteMax[parseInt(minute)] = [parseInt(id), count];
      }
    }
  }

  let maxCount = 0;
  let result = 0;

  for (const [minute, [id, count]] of Object.entries(minuteMax)) {
    if (count > maxCount) {
      maxCount = count;
      result = parseInt(minute) * id;
    }
  }

  return result;
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 16164
