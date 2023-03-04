import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseOperation, executeOperations } from './day08.helper';

const printBoard = (board: boolean[][]): string => {
  return board
    .map((row) => row.map((i) => (i ? '#' : '.')).join(''))
    .join('\n');
};

export const day08p2 = (input: string) => {
  const width = 50;
  const height = 6;
  const operations = input.split('\n').map(parseOperation);
  const board = executeOperations(operations, width, height);
  return printBoard(board);
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // EFEYKFRFIJ
