import { getPuzzle } from '@utilities/getPuzzle';
import { sum, trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseOperation, executeOperations } from './day08.helper';

const countLitPixels = (board: boolean[][]): number => {
  return board.map((row) => row.reduce(trueCount, 0)).reduce(sum);
};

export const day08p1 = (input: string) => {
  const width = 50;
  const height = 6;
  const operations = input.split('\n').map(parseOperation);
  const board = executeOperations(operations, width, height);
  return countLitPixels(board);
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 115
