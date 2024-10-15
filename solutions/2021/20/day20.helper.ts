import { sum } from '@utilities/reduce';

const padGrid = (
  grid: string[][],
  padSize: number,
  pixel = '.'
): string[][] => {
  const width = grid[0].length;

  const paddedGrid: string[][] = [];

  for (let i = 0; i < padSize; i++) {
    paddedGrid.push(pixel.repeat(width + 2 * padSize).split(''));
  }

  for (let i = 0; i < grid.length; i++) {
    paddedGrid.push([
      ...pad(padSize, pixel),
      ...grid[i],
      ...pad(padSize, pixel),
    ]);
  }

  for (let i = 0; i < padSize; i++) {
    paddedGrid.push(pixel.repeat(width + 2 * padSize).split(''));
  }

  return paddedGrid;
};

const pad = (length: number, pixel = '.'): string[] => {
  return pixel.repeat(length).split('');
};

const convolutionNumber = (grid: string[][], x: number, y: number): number => {
  const rows = [y - 1, y, y + 1];
  const neighbours = rows.map((row) => grid[row].slice(x - 1, x + 2));
  const binary = neighbours.flat().map((i) => (i === '.' ? '0' : '1'));
  return parseInt(binary.join(''), 2);
};

const enhance = (grid: string[][], enhancements: string): string[][] => {
  const width = grid[0].length;
  const height = grid.length;
  const infinityPixel = enhancements.charAt(convolutionNumber(grid, 1, 1));
  const enhancedGrid: string[][] = [infinityPixel.repeat(width).split('')];

  for (let y = 1; y < height - 1; y++) {
    const row: string[] = [infinityPixel];

    for (let x = 1; x < width - 1; x++) {
      const index = convolutionNumber(grid, x, y);
      row.push(enhancements.charAt(index));
    }

    row.push(infinityPixel);
    enhancedGrid.push(row);
  }

  enhancedGrid.push(infinityPixel.repeat(width).split(''));
  return enhancedGrid;
};

export const enhanceGrid = (
  initialGrid: string[][],
  enhancements: string,
  count: number
): string[][] => {
  let grid = padGrid(initialGrid, 2);

  for (let i = 0; i < count; i++) {
    grid = enhance(grid, enhancements);
    grid = padGrid(grid, 1, grid[0][0]);
  }

  return grid;
};

export const countPixels = (grid: string[][]): number => {
  return grid.map((row) => row.filter((i) => i === '#').length).reduce(sum, 0);
};
