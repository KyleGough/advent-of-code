import { day20p1 } from './p1';
import { day20p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 20 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day20p1(input)).toBe(831_600);
  });

  test('Part 2 Input', () => {
    expect(day20p2(input)).toBe(884_520);
  });
});
