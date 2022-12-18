import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { simulatePyroclasticFlow } from './day17.helper';

// Heuristic amount, needs to be large to get periodicity.
const numRocks = 6000;

const getPeriodicity = (gridHeightDiffs: number[]): number => {
  const reversedDiffs = gridHeightDiffs.slice().reverse();
  const repeatCount = [];

  for (let i = 1; i < reversedDiffs.length; i++) {
    const sliceA = reversedDiffs.slice(0, i);
    const sliceB = reversedDiffs.slice(i);
    const len = Math.min(sliceA.length, sliceB.length);
    for (let l = 0; l < len; l++) {
      if (sliceA[l] !== sliceB[l]) {
        if (l > 25) {
          repeatCount.push(l);
        }
        break;
      }
    }
  }

  const orderedRepeatCounts = repeatCount.sort((a, b) => b - a);

  return orderedRepeatCounts[0] - orderedRepeatCounts[1];
};

const getRepeatOffset = (
  gridHeightDiffs: number[],
  periodicity: number
): number => {
  for (let i = 0; i < gridHeightDiffs.length - periodicity; i++) {
    const partA = gridHeightDiffs.slice(i, periodicity + i);
    const partB = gridHeightDiffs.slice(periodicity + i, 2 * periodicity + i);

    let match = true;
    for (let p = 0; p < periodicity; p++) {
      if (partA[p] !== partB[p]) {
        match = false;
        break;
      }
    }
    if (match) return i;
  }

  return 0;
};

export const day17p2 = (input: string) => {
  const jet = input.split('');

  const gridHeights = simulatePyroclasticFlow(numRocks, jet);

  // Calculate increase in grid height after each new rock.
  const gridHeightDiffs = [gridHeights[0]];
  for (let i = 1; i < gridHeights.length; i++) {
    gridHeightDiffs.push(gridHeights[i] - gridHeights[i - 1]);
  }

  // Number of rocks in each repeating period.
  const periodicity = getPeriodicity(gridHeightDiffs);

  // Number of rocks before the repeating pattern starts.
  const offset = getRepeatOffset(gridHeightDiffs, periodicity);

  // Height of rocks before repeating pattern.
  const offsetHeight = gridHeights[offset - 1];

  // Total height of one repeating period of rocks.
  const periodHeight = gridHeights[offset + periodicity] - gridHeights[offset];

  const elephantNumRocks = 1_000_000_000_000;

  // Number of repeating periods that fit in the desired number of rocks.
  const periodCount = Math.floor((elephantNumRocks - offset) / periodicity);

  // Number of rocks remaining after last full repeating period.
  const remainder = elephantNumRocks - (periodCount * periodicity + offset);

  const remainderHeight =
    gridHeights[offset + remainder - 1] - gridHeights[offset - 1];

  return remainderHeight + offsetHeight + periodCount * periodHeight;
};

const input = getPuzzle(__dirname).input;
run(() => day17p2(input)); // 1585673352422
