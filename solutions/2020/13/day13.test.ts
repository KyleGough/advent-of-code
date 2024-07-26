import { day13p1 } from './p1';
import { day13p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 13 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day13p1(example)).toBe(295);
  });

  test('Part 1 Input', () => {
    expect(day13p1(input)).toBe(4135);
  });

  test('Part 2 Example', () => {
    expect(day13p2(example)).toBe(1_068_781);
  });

  test('Part 2 Input', () => {
    expect(day13p2(input)).toBe(640_856_202_464_541);
  });
});
