import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { transpose } from '@utilities/array';
import { Coord, getGalaxyCoords, Universe } from './day11.helper';

const EXPANSION_AMOUNT = 1000000;

export const day11p2 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split('').map((j) => j === '#'));
  const emptyRows = getEmptyRows(grid);
  const emptyColumns = getEmptyColumns(grid);
  const galaxies = getGalaxyCoords(grid);
  return sumPairLength(galaxies, emptyRows, emptyColumns);
};

const getEmptyRows = (grid: Universe): number[] => {
  const emptyRows = [];

  for (let r = 0; r < grid.length; r++) {
    if (grid[r].reduce(trueCount, 0) === 0) {
      emptyRows.push(r);
    }
  }

  return emptyRows;
};

const getEmptyColumns = (grid: Universe): number[] => {
  return getEmptyRows(transpose(grid));
};

const sumPairLength = (
  coords: Coord[],
  emptyRows: number[],
  emptyColumns: number[]
): number => {
  let totalLength = 0;

  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      let xLength = Math.abs(coords[i].x - coords[j].x);
      const [xMin, xMax] = [coords[i].x, coords[j].x].sort((a, b) => a - b);

      for (let i = xMin; i <= xMax; i++) {
        if (emptyColumns.includes(i)) {
          xLength += EXPANSION_AMOUNT - 1;
        }
      }

      let yLength = Math.abs(coords[i].y - coords[j].y);
      const [yMin, yMax] = [coords[i].y, coords[j].y].sort((a, b) => a - b);

      for (let i = yMin; i <= yMax; i++) {
        if (emptyRows.includes(i)) {
          yLength += EXPANSION_AMOUNT - 1;
        }
      }

      totalLength += xLength + yLength;
    }
  }

  return totalLength;
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 553224415344
