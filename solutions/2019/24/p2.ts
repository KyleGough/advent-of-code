import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { sum } from '@utilities/reduce';

export const day24p2 = (input: string, minutes: number) => {
  const tile = input.split('\n').join('');
  let grid = Array<string>(minutes + 3).fill('.'.repeat(25));
  const centre = Math.floor(grid.length / 2);
  grid[centre] = tile;

  const convolutions = getConvolutions();

  for (let time = 1; time <= minutes; time++) {
    const nextGrid: string[] = grid.slice(0);
    const layerStart = centre - Math.ceil(time / 2);
    const layerEnd = centre + Math.ceil(time / 2);

    for (let layer = layerStart; layer <= layerEnd; layer++) {
      nextGrid[layer] = updateTile(grid, layer, convolutions);
    }

    grid = nextGrid;
  }

  return countBugs(grid);
};

interface Convolution {
  x: number;
  layer: number;
}

const getConvolutions = (): Convolution[][] => {
  const convolutions: Convolution[][] = [];

  for (let i = 0; i < 25; i++) {
    convolutions[i] = [];

    // Centre cell.
    if (i === 12) {
      continue;
    }

    // Cells on the outer-edge are adjacent to a cell in the previous layer.
    if (i < 5) {
      convolutions[i].push({ layer: -1, x: 7 });
    }
    if (i % 5 === 0) {
      convolutions[i].push({ layer: -1, x: 11 });
    }
    if (i % 5 === 4) {
      convolutions[i].push({ layer: -1, x: 13 });
    }
    if (i >= 20) {
      convolutions[i].push({ layer: -1, x: 17 });
    }

    // Normal adjacencies.
    if (i < 20 && i !== 7) {
      convolutions[i].push({ layer: 0, x: i + 5 });
    }
    if (i % 5 < 4 && i !== 11) {
      convolutions[i].push({ layer: 0, x: i + 1 });
    }
    if (i % 5 > 0 && i !== 13) {
      convolutions[i].push({ layer: 0, x: i - 1 });
    }
    if (i > 4 && i !== 17) {
      convolutions[i].push({ layer: 0, x: i - 5 });
    }

    // Cells on the inner-edge are adjacent to cells in the next layer.
    if (i === 7) {
      for (let x = 0; x <= 4; x++) {
        convolutions[i].push({ layer: 1, x });
      }
    }
    if (i === 11) {
      for (let x = 0; x < 25; x += 5) {
        convolutions[i].push({ layer: 1, x });
      }
    }
    if (i === 13) {
      for (let x = 4; x < 25; x += 5) {
        convolutions[i].push({ layer: 1, x });
      }
    }
    if (i === 17) {
      for (let x = 20; x <= 24; x++) {
        convolutions[i].push({ layer: 1, x });
      }
    }
  }

  return convolutions;
};

const updateTile = (
  grid: string[],
  currentLayer: number,
  convolutions: Convolution[][]
): string => {
  const nextTile: string[] = [];
  const tile = grid[currentLayer];

  for (let i = 0; i < 25; i++) {
    const convolution = convolutions[i];
    const adjacent: string[] = [];

    for (const { layer, x } of convolution) {
      adjacent.push(grid[currentLayer + layer].charAt(x));
    }

    const bugCount = adjacent.filter((cell) => cell === '#').length;

    if (bugCount === 1 || (tile.charAt(i) === '.' && bugCount === 2)) {
      nextTile.push('#');
    } else {
      nextTile.push('.');
    }
  }

  return nextTile.join('');
};

const countBugs = (grid: string[]): number => {
  return grid
    .map((layer) => layer.split('').filter((x) => x === '#').length)
    .reduce(sum, 0);
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day24p2(...input)); // 1967
