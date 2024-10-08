import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseBoard } from './day04.helper';

export const day04p2 = (input: string) => {
  const bingo = input.split('\n\n');
  const nums = bingo[0].split(',').map(Number);
  const boards = bingo.slice(1).map(parseBoard);

  let latestWinScore = 0;
  let latestWinTime = 0;

  for (const board of boards) {
    for (let n = 0; n < nums.length; n++) {
      board.checkNumber(nums[n]);
      if (board.isBingo()) {
        if (n > latestWinTime) {
          latestWinTime = n;
          latestWinScore = board.getScore() * nums[n];
        }
        break;
      }
    }
  }

  return latestWinScore;
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 14877
