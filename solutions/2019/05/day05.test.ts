import { day05p1 } from './p1';
import { day05p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 05 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day05p1(input)).toBe(15_259_545);
  });

  test('Part 2 Input', () => {
    expect(day05p2(input)).toBe(7_616_021);
  });
});
