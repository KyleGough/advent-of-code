import { day17p1 } from './p1';
import { day17p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 17 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day17p1(example)).toBe(112);
  });

  test('Part 1 Input', () => {
    expect(day17p1(input)).toBe(362);
  });

  test('Part 2 Example', () => {
    expect(day17p2(example)).toBe(848);
  });

  test('Part 2 Input', () => {
    expect(day17p2(input)).toBe(1980);
  });
});
