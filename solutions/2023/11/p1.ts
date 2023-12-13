import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';
import { transpose } from '@utilities/array';
import { Coord, getGalaxyCoords, Universe } from './day11.helper';

export const day11p1 = (input: string) => {
  const grid = input.split('\n').map((i) => i.split('').map((j) => j === '#'));
  const expandedGrid = expandUniverse(grid);
  const galaxies = getGalaxyCoords(expandedGrid);
  return sumPairLength(galaxies);
};

const expandRows = (grid: Universe): Universe => {
  const expandedGrid = [];

  for (let r = 0; r < grid.length; r++) {
    expandedGrid.push(grid[r]);
    if (grid[r].reduce(trueCount, 0) === 0) {
      expandedGrid.push(grid[r]);
    }
  }

  return expandedGrid;
};

const expandUniverse = (grid: Universe): Universe => {
  return transpose(expandRows(transpose(expandRows(grid))));
};

const sumPairLength = (coords: Coord[]): number => {
  let totalLength = 0;

  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      totalLength += Math.abs(coords[i].x - coords[j].x);
      totalLength += Math.abs(coords[i].y - coords[j].y);
    }
  }

  return totalLength;
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 9521776
