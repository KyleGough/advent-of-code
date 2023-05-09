import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Vector, movePosition, distanceFromOrigin } from './day11.helper';

export const day11p2 = (input: string) => {
  const moves = input.split(',');
  let position: Vector = { q: 0, r: 0 };
  let maxDistance = 0;

  for (const move of moves) {
    position = movePosition(move, position);
    const currentDistance = distanceFromOrigin(position);
    if (currentDistance > maxDistance) {
      maxDistance = currentDistance;
    }
  }

  return maxDistance;
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 1501
