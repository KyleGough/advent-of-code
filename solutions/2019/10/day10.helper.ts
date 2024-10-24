import { gcd } from '@utilities/math';

export type Coord = [number, number];

export const getAsteroids = (grid: string[][]): Coord[] => {
  const asteroids: Coord[] = [];
  const height = grid.length;
  const width = grid[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '#') {
        asteroids.push([x, y]);
      }
    }
  }

  return asteroids;
};

const getDisplacements = (origin: Coord, asteroids: Coord[]): Coord[] => {
  const displacements: Coord[] = [];

  for (const [ax, ay] of asteroids) {
    if (ax === origin[0] && ay === origin[1]) continue;
    displacements.push([ax - origin[0], ay - origin[1]]);
  }

  return displacements;
};

const countAsteroids = (displacements: Coord[]): number => {
  const visibleCoords: Coord[] = [];

  // Sorts asteriods ascending by distance from (x,y).
  const sortedCoords = displacements.sort(
    (a, b) => getDistance(a) - getDistance(b)
  );

  // Check asteriod against known visible asteriods.
  for (let i = 0; i < sortedCoords.length; i++) {
    if (isVisible(visibleCoords, sortedCoords[i])) {
      visibleCoords.push(reduceCoord(sortedCoords[i]));
    }
  }

  return visibleCoords.length;
};

interface Station {
  station: Coord;
  count: number;
  displacements: Coord[];
}

export const findStation = (asteroids: Coord[]): Station => {
  let maxCount = 0;
  let station;
  let stationDisplacements: Coord[] = [];

  for (const base of asteroids) {
    const displacements = getDisplacements(base, asteroids);
    const count = countAsteroids(displacements);
    if (count > maxCount) {
      maxCount = count;
      station = base;
      stationDisplacements = displacements;
    }
  }

  if (!station) {
    throw new Error('Unable to find location for station.');
  }

  return { station, count: maxCount, displacements: stationDisplacements };
};

export const isVisible = (previous: Coord[], current: Coord): boolean => {
  const reduced = reduceCoord(current);

  for (const [x, y] of previous) {
    if (reduced[0] === x && reduced[1] === y) {
      return false;
    }
  }

  return true;
};

export const reduceCoord = (coord: Coord): Coord => {
  const divisor = Math.abs(gcd(coord[0], coord[1]));
  return [coord[0] / divisor, coord[1] / divisor];
};

export const getDistance = (coord: Coord): number => {
  return Math.sqrt(Math.pow(coord[0], 2) + Math.pow(coord[1], 2));
};
