import { day13p1 } from './p1';
import { day13p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, input } = getPuzzle(__dirname);

describe('Day 13 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day13p1(example)).toBe('7,3');
  });

  test('Part 1 Input', () => {
    expect(day13p1(input)).toBe('86,118');
  });

  test('Part 2 Example', () => {
    expect(day13p2(example2)).toBe('6,4');
  });

  test('Part 2 Input', () => {
    expect(day13p2(input)).toBe('2,81');
  });
});
