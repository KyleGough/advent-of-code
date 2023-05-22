import { sum } from '@utilities/reduce';

type Grid = string[][];

const initialGrid: Grid = [
  ['.', '#', '.'],
  ['.', '.', '#'],
  ['#', '#', '#'],
];

const gridToString = (grid: Grid): string =>
  grid.map((i) => i.join('')).join('/');

const stringToGrid = (input: string): Grid =>
  input.split('/').map((i) => i.split(''));

const flipY = (input: string): string => {
  const grid = stringToGrid(input);

  grid.forEach((row) => {
    row.reverse();
  });

  return gridToString(grid);
};

const flipX = (input: string): string => {
  const grid = stringToGrid(input);
  grid.reverse();
  return gridToString(grid);
};

const rotate90 = (input: string): string => {
  const grid = stringToGrid(input);
  const rotGrid = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid.map((r) => r[i]);
    row.reverse();
    rotGrid.push(row);
  }

  return gridToString(rotGrid);
};

const rotate180 = (input: string): string => {
  const grid = stringToGrid(input);
  grid.reverse();

  for (let i = 0; i < grid.length; i++) {
    grid[i].reverse();
  }

  return gridToString(grid);
};

const rotate270 = (input: string): string => {
  const grid = stringToGrid(input);
  const rotGrid = [];

  for (let i = 0; i < grid.length; i++) {
    rotGrid.push(grid.map((r) => r[grid.length - i - 1]));
  }

  return gridToString(rotGrid);
};

const parseRule = (input: string): Record<string, string> => {
  const [pre, post] = input.split(' => ');

  return {
    [pre]: post,
    [flipY(pre)]: post,
    [flipX(pre)]: post,
    [rotate90(pre)]: post,
    [rotate90(flipY(pre))]: post,
    [rotate90(flipX(pre))]: post,
    [rotate180(pre)]: post,
    [rotate270(pre)]: post,
  };
};

const enhanceGrid = (grid: Grid, rules: Record<string, string>): Grid => {
  const step = grid.length % 2 === 0 ? 2 : 3;
  const enhancedGrid: Grid = [];

  for (let row = 0; row < grid.length; row += step) {
    const rowSection = grid.slice(row, row + step);
    const enhancedRow: Grid[] = [];

    for (let col = 0; col < grid.length; col += step) {
      const section = rowSection.map((i) => i.slice(col, col + step));
      const mapping = rules[gridToString(section)];
      const enhancedSection = stringToGrid(mapping);
      enhancedRow.push(enhancedSection);
    }

    for (let i = 0; i <= step; i++) {
      enhancedGrid.push(enhancedRow.map((e) => e[i]).flat());
    }
  }

  return enhancedGrid;
};

const countPixels = (grid: Grid): number =>
  grid.map((row) => row.filter((i) => i === '#').length).reduce(sum, 0);

export const enhanceImage = (input: string, iterations: number): number => {
  const rules = input
    .split('\n')
    .map(parseRule)
    .reduce((prev, curr) => Object.assign(prev, curr), {});

  let grid = initialGrid;

  for (let i = 0; i < iterations; i++) {
    grid = enhanceGrid(grid, rules);
  }

  return countPixels(grid);
};
