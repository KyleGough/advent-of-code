import { Intcode } from '../05/day05.helper';
import { modulo } from '@utilities/modulo';

export const coordToString = (x: number, y: number): string => `${x},${y}`;

export const getRobotPainting = (
  nums: number[],
  initialTile: number
): Record<string, number> => {
  let x = 0;
  let y = 0;
  let direction = 0;

  const grid: Record<string, number> = { '0,0': initialTile };

  const program = new Intcode(nums);

  while (!program.halt) {
    const panelId = coordToString(x, y);
    const panel = grid[panelId] ?? 0;

    // Paint current panel.
    grid[panelId] = program.awaitOutput([panel]);

    // Rotate either left or right 90 degrees.
    const output = program.awaitOutput([]);
    direction = modulo(direction + (output === 0 ? -1 : 1), 4);

    // Move forward.
    switch (direction) {
      case 0:
        y -= 1;
        break;
      case 1:
        x += 1;
        break;
      case 2:
        y += 1;
        break;
      case 3:
        x -= 1;
        break;
    }
  }

  return grid;
};
