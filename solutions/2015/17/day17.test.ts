import { day17p1 } from './p1';
import { day17p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 17 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day17p1(...example)).toBe(4);
  });

  test('Part 1 Input', () => {
    expect(day17p1(...input)).toBe(1304);
  });

  test('Part 2 Example', () => {
    expect(day17p2(...example)).toBe(3);
  });

  test('Part 2 Input', () => {
    expect(day17p2(...input)).toBe(18);
  });
});
