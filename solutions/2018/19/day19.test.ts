import { day19p1 } from './p1';
import { day19p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 19 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day19p1(example)).toBe(7);
  });

  test('Part 1 Input', () => {
    expect(day19p1(input)).toBe(1620);
  });

  test('Part 2 Input', () => {
    expect(day19p2(input)).toBe(15_827_082);
  });
});
