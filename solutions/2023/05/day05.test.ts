import { day05p1 } from './p1';
import { day05p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 05 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day05p1(example)).toBe(35);
  });

  test('Part 1 Input', () => {
    expect(day05p1(input)).toBe(525_792_406);
  });

  test('Part 2 Example', () => {
    expect(day05p2(example)).toBe(46);
  });

  test('Part 2 Input', () => {
    expect(day05p2(input)).toBe(79_004_094);
  });
});
