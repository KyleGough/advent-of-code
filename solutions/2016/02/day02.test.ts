import { day02p1 } from './p1';
import { day02p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 02 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day02p1(example)).toBe('1985');
  });

  test('Part 1 Input', () => {
    expect(day02p1(input)).toBe('56983');
  });

  test('Part 2 Example', () => {
    expect(day02p2(example)).toBe('5DB3');
  });

  test('Part 2 Input', () => {
    expect(day02p2(input)).toBe('8B8B1');
  });
});
