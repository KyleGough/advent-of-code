import { day12p1 } from './p1';
import { day12p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 12 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day12p1(example)).toBe(21);
  });

  test('Part 1 Input', () => {
    expect(day12p1(input)).toBe(7705);
  });

  test('Part 2 Example', () => {
    expect(day12p2(example)).toBe(525_152);
  });

  test('Part 2 Input', () => {
    expect(day12p2(input)).toBe(50_338_344_809_230);
  });
});
