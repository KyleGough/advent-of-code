interface Cart {
  id: string;
  x: number;
  y: number;
  direction: Direction;
  intersections: number;
  impact: boolean;
}

export interface Impact {
  cart?: Cart;
  hasImpact: boolean;
}

type Grid = string[][];

type Direction = 'N' | 'E' | 'S' | 'W';

const directionMap: Record<Direction, Record<string, Direction>> = {
  N: {
    '|': 'N',
    '/': 'E',
    '\\': 'W',
  },
  E: {
    '-': 'E',
    '/': 'N',
    '\\': 'S',
  },
  S: {
    '|': 'S',
    '/': 'W',
    '\\': 'E',
  },
  W: {
    '-': 'W',
    '/': 'S',
    '\\': 'N',
  },
};

const intersectionMap: Record<Direction, Direction[]> = {
  N: ['W', 'N', 'E'],
  E: ['N', 'E', 'S'],
  S: ['E', 'S', 'W'],
  W: ['S', 'W', 'N'],
};

/**
 * Sorts carts first by y coord then by x coord.
 */
const sortCarts = (carts: Cart[]): Cart[] => {
  return carts.sort((a: Cart, b: Cart) => {
    if (a.y < b.y) {
      return -1;
    } else if (a.y > b.y) {
      return 1;
    } else if (a.x < b.x) {
      return -1;
    } else if (a.x > b.x) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const checkImpact = (movedCart: Cart, carts: Cart[]): Impact => {
  for (let i = 0; i < carts.length; i++) {
    if (
      carts[i].x === movedCart.x &&
      carts[i].y === movedCart.y &&
      carts[i].id !== movedCart.id
    ) {
      carts[i].impact = true;
      movedCart.impact = true;
      return {
        cart: movedCart,
        hasImpact: true,
      };
    }
  }

  return {
    hasImpact: false,
  };
};

const newCart = (x: number, y: number, direction: Direction) => ({
  x,
  y,
  direction,
  intersections: 0,
  id: `${x},${y}`,
  impact: false,
});

/**
 * Extracts the carts from the grid, replaces the carts in the grid with tracks.
 */
export const getCarts = (grid: Grid): Cart[] => {
  const carts: Cart[] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      switch (grid[y][x]) {
        case '^':
          grid[y][x] = '|';
          carts.push(newCart(x, y, 'N'));
          break;
        case '>':
          grid[y][x] = '-';
          carts.push(newCart(x, y, 'E'));
          break;
        case 'v':
          grid[y][x] = '|';
          carts.push(newCart(x, y, 'S'));
          break;
        case '<':
          grid[y][x] = '-';
          carts.push(newCart(x, y, 'W'));
          break;
        default:
          break;
      }
    }
  }

  return sortCarts(carts);
};

const getDirection = (cart: Cart, cell: string): Direction => {
  if (cell === '+') {
    return intersectionMap[cart.direction][cart.intersections % 3];
  } else {
    return directionMap[cart.direction][cell];
  }
};

export const moveCart = (cart: Cart, grid: Grid): Cart => {
  const { x, y, direction, intersections } = cart;
  let nextX = x;
  let nextY = y;
  let cell = '';

  switch (direction) {
    case 'N':
      cell = grid[y - 1][x];
      nextY = y - 1;
      break;
    case 'E':
      cell = grid[y][x + 1];
      nextX = x + 1;
      break;
    case 'S':
      cell = grid[y + 1][x];
      nextY = y + 1;
      break;
    case 'W':
      cell = grid[y][x - 1];
      nextX = x - 1;
      break;
  }

  return {
    ...cart,
    x: nextX,
    y: nextY,
    direction: getDirection(cart, cell),
    intersections: cell === '+' ? intersections + 1 : intersections,
  };
};
