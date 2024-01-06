import { day21p1 } from './p1';
import { day21p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 21 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day21p1(...example)).toBe(16);
  });

  test('Part 1 Input', () => {
    expect(day21p1(...input)).toBe(3637);
  });

  test('Part 2 Input', () => {
    expect(day21p2(input[0])).toBe(601_113_643_448_699);
  });
});
