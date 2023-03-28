import { getPuzzle } from '@utilities/getPuzzle';
import { permutations } from '@utilities/permutations';
import { run } from '@utilities/run';
import { parseMaze, getAdjacencyMatrix, getTotalDist } from './day24.helper';

export const day24p2 = (input: string) => {
  const [grid, locations] = parseMaze(input);
  const matrix = getAdjacencyMatrix(grid, locations);
  const orders = permutations(
    Object.keys(locations)
      .map((i) => parseInt(i))
      .slice(1)
  );
  let minDist = Number.MAX_VALUE;

  for (let i = 0; i < orders.length; i++) {
    const order = [0, ...orders[i], 0];
    const dist = getTotalDist(order, matrix);
    if (dist < minDist) {
      minDist = dist;
    }
  }

  return minDist;
};

const input = getPuzzle(__dirname).input;
run(() => day24p2(input)); // 744
