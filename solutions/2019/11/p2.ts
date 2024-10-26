import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { coordToString, getRobotPainting } from './day11.helper';

export const day11p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  const painting = getRobotPainting(nums, 1);
  const panels = getWhitePanels(painting);
  const { minX, maxX, minY, maxY } = getBoundingBox(panels);
  const grid: string[] = [];

  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      const panel = painting[coordToString(x, y)];
      row.push(panel === 1 ? '#' : '.');
    }
    grid.push(row.join(''));
  }

  return grid.join('\n');
};

const stringToPanel = (input: string): [number, number] => {
  const nums = input.split(',').map(Number);
  return [nums[0], nums[1]];
};

const getWhitePanels = (
  painting: Record<string, number>
): [number, number][] => {
  return Object.keys(painting)
    .filter((key) => painting[key] === 1)
    .map(stringToPanel);
};

const getBoundingBox = (panels: [number, number][]) => {
  const minX = panels.reduce(
    (prev, curr) => Math.min(prev, curr[0]),
    Number.MAX_SAFE_INTEGER
  );
  const maxX = panels.reduce(
    (prev, curr) => Math.max(prev, curr[0]),
    Number.MIN_SAFE_INTEGER
  );

  const minY = panels.reduce(
    (prev, curr) => Math.min(prev, curr[1]),
    Number.MAX_SAFE_INTEGER
  );

  const maxY = panels.reduce(
    (prev, curr) => Math.max(prev, curr[1]),
    Number.MIN_SAFE_INTEGER
  );

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // CGPJCGCL
