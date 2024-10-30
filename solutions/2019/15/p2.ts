import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Coord, directions, exploreMaze, Position } from './day15.helper';

export const day15p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  const { grid, pos } = exploreMaze(nums);
  return floodFill(grid, pos);
};

const floodFill = (grid: Record<Coord, string>, pos: Position): number => {
  let frontiers = [pos];
  let time = 0;

  while (frontiers.length) {
    const nextFrontiers = [];
    time += 1;

    for (const frontier of frontiers) {
      // Check all adjacent tiles.
      for (const { x, y } of directions) {
        const neighbour = { x: x + frontier.x, y: y + frontier.y };
        const hash: Coord = `${neighbour.x},${neighbour.y}`;
        if (grid[hash] === '.') {
          nextFrontiers.push(neighbour);
        }
      }

      // Remove tile from the candidate tiles.
      delete grid[`${frontier.x},${frontier.y}`];
    }

    frontiers = nextFrontiers;
  }

  return time - 1;
};

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 314
