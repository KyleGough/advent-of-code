import { day09p1 } from './p1';
import { day09p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 09 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day09p1(example)).toBe(32);
  });

  test('Part 1 Input', () => {
    expect(day09p1(input)).toBe(410375);
  });

  test('Part 2 Example', () => {
    expect(day09p2(example)).toBe(22563);
  });

  test('Part 2 Input', () => {
    expect(day09p2(input)).toBe(3_314_195_047);
  });
});
