interface Cell {
  height: number;
  visited: boolean;
  distance: number;
}

export const canClimb = (currentCell: Cell, nextCell: Cell): boolean => {
  return nextCell.height <= currentCell.height + 1;
};

export const parseHeightMap = (input: string) => {
  const grid = input.split('\n').map((i) => i.split(''));

  let start: number[] = [];
  let end: number[] = [];

  const heightMap: Cell[][] = grid.map((i, row) =>
    i.map((cell, column) => {
      if (cell === 'S') {
        cell = 'a';
        start = [row, column];
        return {
          height: 1,
          visited: false,
          distance: 0,
        };
      } else if (cell === 'E') {
        cell = 'z';
        end = [row, column];
      }
      return {
        height: cell.charCodeAt(0) - 96,
        visited: false,
        distance: Number.MAX_VALUE,
      };
    })
  );

  return {
    start,
    end,
    heightMap,
    width: grid[0].length,
    height: grid.length,
  };
};
