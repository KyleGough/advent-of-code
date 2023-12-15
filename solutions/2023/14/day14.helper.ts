export const tiltNorth = (grid: string[][]): string[][] => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'O') {
        let newY = y - 1;
        let canMove = false;

        while (newY >= 0 && grid[newY][x] === '.') {
          canMove = true;
          newY -= 1;
        }

        if (canMove) {
          grid[newY + 1][x] = 'O';
          grid[y][x] = '.';
        }
      }
    }
  }

  return grid;
};

export const getTotalLoad = (grid: string[][]): number => {
  const height = grid.length;
  let load = 0;

  for (let i = 0; i < height; i++) {
    const rockCount = grid[i].filter((cell) => cell === 'O').length;
    load += rockCount * (height - i);
  }

  return load;
};
