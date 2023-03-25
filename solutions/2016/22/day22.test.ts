import { day22p1 } from './p1';
import { day22p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 22 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day22p1(input)).toBe(892);
  });

  test('Part 2 Input', () => {
    expect(day22p2(input)).toBe(227);
  });
});
