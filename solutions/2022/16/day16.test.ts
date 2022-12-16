import { day16p1 } from './p1';
import { day16p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 16 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day16p1(example)).toBe(1651);
  });

  test('Part 1 Input', () => {
    expect(day16p1(input)).toBe(1792);
  });

  test('Part 2 Example', () => {
    expect(day16p2(example)).toBe(1707);
  });

  test('Part 2 Input', () => {
    expect(day16p2(input)).toBe(2587);
  });
});
