interface Coord {
  x: number;
  y: number;
}

interface Fold {
  axis: 'x' | 'y';
  value: number;
}

export const parseCoord = (input: string): Coord => {
  const [x, y] = input.split(',').map(Number);
  return { x, y };
};

export const parseFold = (input: string): Fold => {
  const [axis, value] = input.split(' ')[2].split('=');
  return {
    axis: axis as Fold['axis'],
    value: parseInt(value),
  };
};

export const performFold = (coord: Coord, fold: Fold): Coord => {
  const { x, y } = coord;
  const { axis, value } = fold;

  if (axis === 'x') {
    return {
      x: x > value ? value + value - x : x,
      y,
    };
  } else {
    return {
      x,
      y: y > value ? value + value - y : y,
    };
  }
};

export const coordToString = ({ x, y }: Coord): string => {
  return `${x},${y}`;
};
