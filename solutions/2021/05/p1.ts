import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day05p1 = (input: string) => {
  const lines = input
    .split('\n')
    .map(parseLine)
    .filter(filterLines)
    .map(getBoundary);

  const overlaps = new Set<string>();

  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const boundaryA = lines[i];
      const boundaryB = lines[j];
      const minmaxX = Math.max(boundaryA[0], boundaryB[0]);
      const maxminX = Math.min(boundaryA[1], boundaryB[1]);
      const minmaxY = Math.max(boundaryA[2], boundaryB[2]);
      const maxminY = Math.min(boundaryA[3], boundaryB[3]);

      if (minmaxX <= maxminX && minmaxY <= maxminY) {
        for (let x = minmaxX; x <= maxminX; x++) {
          for (let y = minmaxY; y <= maxminY; y++) {
            overlaps.add(`${x},${y}`);
          }
        }
      }
    }
  }

  return overlaps.size;
};

const getBoundary = (line: number[]): number[] => {
  const minX = Math.min(line[0], line[2]);
  const maxX = Math.max(line[0], line[2]);
  const minY = Math.min(line[1], line[3]);
  const maxY = Math.max(line[1], line[3]);
  return [minX, maxX, minY, maxY];
};

const parseLine = (input: string): number[] =>
  input
    .split(' -> ')
    .map((i) => i.split(','))
    .flat()
    .map(Number);

const filterLines = (line: number[]): boolean => {
  return line[0] === line[2] || line[1] === line[3];
};

const input = getPuzzle(__dirname).input;
run(() => day05p1(input)); // 5632
