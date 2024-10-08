import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseBoard } from './day04.helper';

export const day04p1 = (input: string) => {
  const bingo = input.split('\n\n');
  const nums = bingo[0].split(',').map(Number);
  const boards = bingo.slice(1).map(parseBoard);

  for (const num of nums) {
    for (const board of boards) {
      board.checkNumber(num);
      if (board.isBingo()) {
        return board.getScore() * num;
      }
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 69579
