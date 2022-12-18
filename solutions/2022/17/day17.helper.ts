type Grid = boolean[][];
type Rock = Grid;

const width = 7;

const rocks: Rock[] = [
  ['..####.'], // Horizontal Line
  ['...#...', '..###..', '...#...'], // Cross
  ['....#..', '....#..', '..###..'], // Corner
  ['..#....', '..#....', '..#....', '..#....'], // Vertical Line
  ['..##...', '..##...'], // Square
].map((rock) => rock.map((row) => row.split('').map((cell) => cell === '#')));

export const simulatePyroclasticFlow = (
  numRocks: number,
  jet: string[]
): number[] => {
  let grid: Grid = [];
  let jetIndex = 0;
  const gridHeights: number[] = [];

  for (let i = 0; i < numRocks; i++) {
    let rock = rocks[i % 5];
    const rockHeight = rock.length;
    let y = 0;
    let set = false;
    let nextRock: Rock;

    // Add buffer room at the top of the grid.
    for (let i = 0; i < 3 + rockHeight; i++) {
      grid.unshift(Array(width).fill(false));
    }

    // Iteratively move rock with the jet flow and downwards.
    while (!set) {
      const jetflow = jet[jetIndex++ % jet.length];

      // Move rock left/right depending on jet flow.
      nextRock = jetflow === '<' ? moveRockLeft(rock) : moveRockRight(rock);

      // If blocked, revert horizontal flow.
      if (isRockBlocked(grid, nextRock, y)) {
        nextRock = rock;
      }

      const hitFloor = y + 1 >= grid.length;

      // Set rock if it hits the floor or another rock,
      if (hitFloor || isRockBlocked(grid, nextRock, y + 1)) {
        setRock(grid, nextRock, y);
        set = true;
        break;
      }

      // Move rock down.
      y++;
      rock = nextRock;
    }

    grid = trimGrid(grid);
    gridHeights.push(grid.length);
  }

  return gridHeights;
};

// Moves rock left if not blocked by chamber wall.
const moveRockLeft = (rock: Rock) => {
  // If rock is touching left edge, don't move.
  for (let i = 0; i < rock.length; i++) {
    if (rock[i][0]) return rock;
  }

  return rock.map((row) => [...row.slice(1), false]);
};

// Moves rock right if not blocked by chamber wall.
const moveRockRight = (rock: Rock) => {
  // If rock is touching right edge, don't move.
  for (let i = 0; i < rock.length; i++) {
    if (rock[i][width - 1]) return rock;
  }

  return rock.map((row) => [false, ...row.slice(0, row.length - 1)]);
};

// Determines if the rock is blocked by set rocks.
const isRockBlocked = (grid: Grid, rock: Rock, rockY: number) => {
  for (let y = 0; y < rock.length; y++) {
    for (let col = 0; col < width; col++) {
      if (grid[y + rockY][col] && rock[y][col]) return true;
    }
  }

  return false;
};

// Adds the current rock to the grid.
const setRock = (grid: Grid, rock: Rock, rockY: number) => {
  for (let y = 0; y < rock.length; y++) {
    for (let col = 0; col < width; col++) {
      grid[y + rockY][col] = grid[y + rockY][col] || rock[y][col];
    }
  }
};

// Trim the empty rows off the top of the grid.
const trimGrid = (grid: Grid) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].reduce((prev, curr) => prev || curr, false)) {
      return grid.slice(i);
    }
  }

  return grid;
};
