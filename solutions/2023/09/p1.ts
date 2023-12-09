import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseNumbers, constructDiffs } from './day09.helper';

export const day09p1 = (input: string) => {
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

  return sequences.map((i) => i[i.length - 1]).reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day09p1(input)); // 1581679977
