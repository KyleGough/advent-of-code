import { day02p1 } from './p1';
import { day02p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 02 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day02p1(...example)).toBe(3500);
  });

  test('Part 1 Input', () => {
    expect(day02p1(...input)).toBe(5_290_681);
  });

  test('Part 2 Input', () => {
    expect(day02p2(input[0])).toBe(5741);
  });
});
