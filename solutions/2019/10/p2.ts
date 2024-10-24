import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  Coord,
  findStation,
  getAsteroids,
  getDistance,
  isVisible,
  reduceCoord,
} from './day10.helper';

export const day10p2 = (input: string) => {
  const grid = input.split('\n').map((row) => row.split(''));
  const asteroids = getAsteroids(grid);
  const { station, displacements } = findStation(asteroids);
  const targets = getTargets(displacements);

  let vaporisedCount = 0;
  let lastVaporised: Coord = [0, 0];

  while (vaporisedCount < 200) {
    const vaporised: Coord[] = [];

    for (const target of targets) {
      if (target.vaporised) continue;
      if (!isVisible(vaporised, target.coord)) continue;

      vaporisedCount += 1;
      vaporised.push(reduceCoord(target.coord));
      target.vaporised = true;

      if (vaporisedCount === 200) {
        break;
      }
    }

    lastVaporised = vaporised.pop() as Coord;
  }

  const x = lastVaporised[0] + station[0];
  const y = lastVaporised[1] + station[1];
  return x * 100 + y;
};

interface Target {
  coord: Coord;
  angle: number;
  vaporised: boolean;
}

const getAngle = (coord: Coord): number => {
  return Math.atan2(-coord[0], coord[1]);
};

const sortTarget = (targetA: Target, targetB: Target): number => {
  if (targetA.angle < targetB.angle) {
    return -1;
  } else if (targetA.angle > targetB.angle) {
    return 1;
  } else {
    const distA = getDistance(targetA.coord);
    const distB = getDistance(targetB.coord);

    if (distA < distB) {
      return -1;
    } else if (distA > distB) {
      return 1;
    } else {
      return 0;
    }
  }
};

const getTargets = (coords: Coord[]): Target[] => {
  const targets: Target[] = coords.map((coord) => ({
    coord,
    angle: getAngle(coord),
    vaporised: false,
  }));

  return targets.sort(sortTarget);
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 1417
