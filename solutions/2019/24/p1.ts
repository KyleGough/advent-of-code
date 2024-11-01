import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day24p1 = (input: string) => {
  let tile = input.split('\n').join('');
  const tileSet = new Set<string>();

  while (!tileSet.has(tile)) {
    tileSet.add(tile);
    tile = updateTile(tile);
  }

  return getRating(tile);
};

const convolutions: number[][] = [
  [1, -5, 5],
  [-1, -5, 5, 1],
  [-1, -5, 5, 1],
  [-1, -5, 5, 1],
  [-1, -5, 5],
];

const updateTile = (tile: string): string => {
  const nextTile: string[] = [];

  for (let x = 0; x < tile.length; x++) {
    const convolution = convolutions[x % 5];
    const adjacent = convolution.map((dx) => tile.charAt(x + dx));
    const bugCount = adjacent.filter((cell) => cell === '#').length;

    if (bugCount === 1 || (tile.charAt(x) === '.' && bugCount === 2)) {
      nextTile.push('#');
    } else {
      nextTile.push('.');
    }
  }

  return nextTile.join('');
};

const getRating = (tile: string): number => {
  let score = 0;

  for (let i = 0; i < tile.length; i++) {
    if (tile.charAt(i) === '#') {
      score += Math.pow(2, i);
    }
  }

  return score;
};

const input = getPuzzle(__dirname).input;
run(() => day24p1(input)); // 11042850
