import { day12p1 } from './p1';
import { day12p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, example2, input } = getPuzzleWithConfig(
  __dirname,
  customConfig
);

describe('Day 12 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day12p1(...example)).toBe(179);
  });

  test('Part 1 Example 2', () => {
    expect(day12p1(...example2)).toBe(1940);
  });

  test('Part 1 Input', () => {
    expect(day12p1(...input)).toBe(9493);
  });

  test('Part 2 Example 2', () => {
    expect(day12p2(example2[0])).toBe(4_686_774_924);
  });

  test('Part 2 Input', () => {
    expect(day12p2(input[0])).toBe(326_365_108_375_488);
  });
});
