import { day19p1 } from './p1';
import { day19p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 19 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day19p1(input)).toBe(192);
  });

  test('Part 2 Input', () => {
    expect(day19p2(input)).toBe(8_381_082);
  });
});
