import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseNumbers, constructDiffs } from './day09.helper';

export const day09p2 = (input: string) => {
  return input.split('\n').map(parseNumbers).map(getNextNumber).reduce(sum);
};

const getNextNumber = (startSequence: number[]): number => {
  const sequences = [startSequence];
  let nextSequence: number[];
  let allZeroes: boolean;

  do {
    [nextSequence, allZeroes] = constructDiffs(sequences[sequences.length - 1]);
    sequences.push(nextSequence);
  } while (!allZeroes);

  return sequences.map((i) => i[0]).reduceRight((prev, curr) => curr - prev, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day09p2(input)); // 889
