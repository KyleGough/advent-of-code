import { day02p1 } from './p1';
import { day02p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 02 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day02p1(example)).toBe(101);
  });

  test('Part 1 Input', () => {
    expect(day02p1(input)).toBe(1606483);
  });

  test('Part 2 Example', () => {
    expect(day02p2(example)).toBe(48);
  });

  test('Part 2 Input', () => {
    expect(day02p2(input)).toBe(3842356);
  });
});
