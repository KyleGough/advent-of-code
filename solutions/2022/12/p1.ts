import { getPuzzle } from '@utilities/getPuzzle';
import { canClimb, parseHeightMap } from './day12.helper';

export const day12p1 = (input: string) => {
  const { start, end, heightMap, width, height } = parseHeightMap(input);

  let frontierCells: number[][] = [start];
  let newFrontierCells: number[][] = [];
  let bestSignalFound = false;

  while (!bestSignalFound) {
    while (frontierCells.length) {
      const [y, x] = frontierCells.pop() as number[];

      if (y === end[0] && x === end[1]) {
        bestSignalFound = true;
      }

      if (heightMap[y][x].visited) {
        continue;
      }

      // Mark cell as visited.
      heightMap[y][x].visited = true;

      const nextDistance = heightMap[y][x].distance + 1;

      // Out of bounds tests.
      const negXValid = x - 1 >= 0;
      const negYValid = y - 1 >= 0;
      const posXValid = x + 1 < width;
      const posYValid = y + 1 < height;

      // Neighbour cells.
      if (
        negXValid &&
        !heightMap[y][x - 1].visited &&
        canClimb(heightMap[y][x], heightMap[y][x - 1])
      ) {
        newFrontierCells.push([y, x - 1]);
        heightMap[y][x - 1].distance = Math.min(
          nextDistance,
          heightMap[y][x - 1].distance
        );
      }
      if (
        negYValid &&
        !heightMap[y - 1][x].visited &&
        canClimb(heightMap[y][x], heightMap[y - 1][x])
      ) {
        newFrontierCells.push([y - 1, x]);
        heightMap[y - 1][x].distance = Math.min(
          nextDistance,
          heightMap[y - 1][x].distance
        );
      }
      if (
        posXValid &&
        !heightMap[y][x + 1].visited &&
        canClimb(heightMap[y][x], heightMap[y][x + 1])
      ) {
        newFrontierCells.push([y, x + 1]);
        heightMap[y][x + 1].distance = Math.min(
          nextDistance,
          heightMap[y][x + 1].distance
        );
      }
      if (
        posYValid &&
        !heightMap[y + 1][x].visited &&
        canClimb(heightMap[y][x], heightMap[y + 1][x])
      ) {
        newFrontierCells.push([y + 1, x]);
        heightMap[y + 1][x].distance = Math.min(
          nextDistance,
          heightMap[y + 1][x].distance
        );
      }
    }

    frontierCells = newFrontierCells;
    newFrontierCells = [];
  }

  return heightMap[end[0]][end[1]].distance;
};

const input = getPuzzle(__dirname).input;
console.log(day12p1(input)); // 391
