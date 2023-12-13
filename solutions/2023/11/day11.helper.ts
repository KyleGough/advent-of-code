export type Universe = boolean[][];

export interface Coord {
  x: number;
  y: number;
}

export const getGalaxyCoords = (grid: Universe): Coord[] => {
  const width = grid[0].length;
  const height = grid.length;
  const galaxies = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x]) {
        galaxies.push({ x, y });
      }
    }
  }

  return galaxies;
};
