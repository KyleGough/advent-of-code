import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Vector, movePosition, distanceFromOrigin } from './day11.helper';

export const day11p1 = (input: string) => {
  const moves = input.split(',');
  let position: Vector = { q: 0, r: 0 };

  for (const move of moves) {
    position = movePosition(move, position);
  }

  return distanceFromOrigin(position);
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 759
