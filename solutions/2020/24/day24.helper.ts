export interface HexCoord {
  q: number;
  r: number;
  s: number;
}

const followDirections = (directions: string): HexCoord => {
  const coord: HexCoord = {
    q: 0,
    r: 0,
    s: 0,
  };

  while (directions.length) {
    switch (true) {
      case directions.startsWith('ne'):
        coord.q += 1;
        coord.r -= 1;
        directions = directions.slice(2);
        break;
      case directions.startsWith('nw'):
        coord.r -= 1;
        coord.s += 1;
        directions = directions.slice(2);
        break;
      case directions.startsWith('se'):
        coord.r += 1;
        coord.s -= 1;
        directions = directions.slice(2);
        break;
      case directions.startsWith('sw'):
        coord.q -= 1;
        coord.r += 1;
        directions = directions.slice(2);
        break;
      case directions.startsWith('e'):
        coord.q += 1;
        coord.s -= 1;
        directions = directions.slice(1);
        break;
      case directions.startsWith('w'):
        coord.q -= 1;
        coord.s += 1;
        directions = directions.slice(1);
        break;
    }
  }

  return coord;
};

export const coordToString = (coord: HexCoord): string => {
  return `${coord.q},${coord.r},${coord.s}`;
};

export const getInitialBlackTiles = (directions: string[]): Set<string> => {
  const flipTiles = directions.map(followDirections);

  const blackTiles = new Set<string>();

  for (const tile of flipTiles) {
    const coordString = coordToString(tile);
    if (blackTiles.has(coordString)) {
      blackTiles.delete(coordString);
    } else {
      blackTiles.add(coordString);
    }
  }

  return blackTiles;
};
