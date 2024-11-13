export interface Coord {
  x: number;
  y: number;
  shell: number;
}

const isLetter = (input: string): boolean => !!input && !!input.match(/[A-Z]/);

export const coordToString = (coord: Coord): string =>
  `${coord.x},${coord.y},${coord.shell}`;

export const neighbours = [
  { lx: -1, ly: 0, dx: 1, dy: 0 },
  { lx: 1, ly: 0, dx: -1, dy: 0 },
  { lx: 0, ly: -1, dx: 0, dy: 1 },
  { lx: 0, ly: 1, dx: 0, dy: -1 },
];

const getLabels = (grid: string[][]): Record<string, Coord[]> => {
  const labels: Record<string, Coord[]> = {};
  const height = grid.length;
  const width = grid[0].length;

  // Find all labels in the grid.
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (!isLetter(grid[y][x])) continue;

      for (const { lx, ly, dx, dy } of neighbours) {
        if (isLetter(grid[y + ly][x + lx]) && grid[y + dy][x + dx] === '.') {
          let id: string;
          let shell: number;
          if (lx + ly < 0) {
            id = `${grid[y + ly][x + lx]}${grid[y][x]}`;
            shell = y + ly - 1 < 0 || x + lx - 1 < 0 ? 1 : -1;
          } else {
            id = `${grid[y][x]}${grid[y + ly][x + lx]}`;
            shell = y + ly + 1 >= height || x + lx + 1 >= width ? 1 : -1;
          }
          labels[id] = labels[id] ?? [];
          labels[id].push({ x: x + dx, y: y + dy, shell });
        }
      }
    }
  }

  return labels;
};

export const parseGrid = (input: string) => {
  const grid = input.split('\n').map((row) => row.split(''));
  const labels = getLabels(grid);

  // Extract start and end coordinates.
  const start = { ...labels['AA'][0], shell: 0 };
  const end = { ...labels['ZZ'][0], shell: 0 };
  delete labels['AA'];
  delete labels['ZZ'];

  return { grid, labels, start, end };
};
