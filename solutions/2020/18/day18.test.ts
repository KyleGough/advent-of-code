import { day18p1 } from './p1';
import { day18p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 18 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day18p1(example)).toBe(26457);
  });

  test('Part 1 Input', () => {
    expect(day18p1(input)).toBe(5_019_432_542_701);
  });

  test('Part 2 Example', () => {
    expect(day18p2(example)).toBe(694173);
  });

  test('Part 2 Input', () => {
    expect(day18p2(input)).toBe(70_518_821_989_947);
  });
});
