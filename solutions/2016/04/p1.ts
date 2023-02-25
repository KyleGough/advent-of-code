import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseRoom, isRealRoom } from './day04.helper';

export const day04p1 = (input: string) => {
  const rooms = input.split('\n').map(parseRoom).filter(isRealRoom);
  return rooms.map((i) => i.sector).reduce(sum);
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 245102
