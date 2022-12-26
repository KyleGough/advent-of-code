import { day25p1 } from './p1';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 25 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day25p1(example)).toBe('2=-1=0');
  });

  test('Part 1 Input', () => {
    expect(day25p1(input)).toBe('2=0--0---11--01=-100');
  });
});
