import { day17p1 } from './p1';
import { day17p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 17 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day17p1(input)).toBe(6000);
  });

  test('Part 2 Input', () => {
    expect(day17p2(input)).toBe(807320);
  });
});
