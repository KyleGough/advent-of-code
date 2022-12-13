import { getPuzzle } from '@utilities/getPuzzle';
import { canClimb, parseHeightMap } from './day12.helper';

export const day12p2 = (input: string) => {
  const { start, end, heightMap, width, height } = parseHeightMap(input);

  heightMap[start[0]][start[1]].distance = Number.MAX_VALUE;
  heightMap[end[0]][end[1]].distance = 0;

  let frontierCells: number[][] = [end];
  let newFrontierCells: number[][] = [];
  let startFound = false;
  let startCell: number[] = [];

  while (!startFound) {
    while (frontierCells.length) {
      const [y, x] = frontierCells.pop() as number[];

      if (heightMap[y][x].height === 1) {
        startFound = true;
        startCell = [y, x];
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
        canClimb(heightMap[y][x - 1], heightMap[y][x])
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
        canClimb(heightMap[y - 1][x], heightMap[y][x])
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
        canClimb(heightMap[y][x + 1], heightMap[y][x])
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
        canClimb(heightMap[y + 1][x], heightMap[y][x])
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

  return heightMap[startCell[0]][startCell[1]].distance;
};

const input = getPuzzle(__dirname).input;
console.log(day12p2(input)); // 386
