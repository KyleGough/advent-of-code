import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  parseCoord,
  parseFold,
  performFold,
  coordToString,
} from './day13.helper';
import { max } from '@utilities/reduce';

export const day13p2 = (input: string) => {
  const [coordData, foldData] = input.split('\n\n');
  const coords = coordData.split('\n').map(parseCoord);
  const folds = foldData.split('\n').map(parseFold);
  const foldedCoords = coords.map((c) =>
    folds.reduce((prev, curr) => performFold(prev, curr), c)
  );

  const maxX = foldedCoords.map((c) => c.x).reduce(max, 0);
  const maxY = foldedCoords.map((c) => c.y).reduce(max, 0);

  const grid: string[][] = [];
  for (let y = 0; y <= maxY; y++) {
    grid.push(Array(maxX + 1).fill(' '));
  }

  for (const { x, y } of foldedCoords) {
    grid[y][x] = '#';
  }

  return grid.map((row) => row.join('')).join('\n');
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // PZEHRAER
