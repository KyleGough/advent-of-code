import { day14p1 } from './p1';
import { day14p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 14 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day14p1(...example)).toBe(1120);
  });

  test('Part 1 Input', () => {
    expect(day14p1(...input)).toBe(2696);
  });

  test('Part 2 Example', () => {
    expect(day14p2(...example)).toBe(689);
  });

  test('Part 2 Input', () => {
    expect(day14p2(...input)).toBe(1084);
  });
});
