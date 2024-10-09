export const adjacentCoords = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

export const isMinimum = (grid: number[][], x: number, y: number): boolean => {
  const value = grid[y][x];

  for (const { dx, dy } of adjacentCoords) {
    if ((grid?.[y + dy]?.[x + dx] ?? 99) <= value) {
      return false;
    }
  }

  return true;
};
