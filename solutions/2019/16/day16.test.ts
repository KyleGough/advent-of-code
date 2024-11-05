import { day16p1 } from './p1';
import { day16p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, example3, input } = getPuzzle(__dirname);

describe('Day 16 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day16p1(example)).toBe('24176176');
  });

  test('Part 1 Example 2', () => {
    expect(day16p1(example2)).toBe('73745418');
  });

  test('Part 1 Example 3', () => {
    expect(day16p1(example3)).toBe('52432133');
  });

  test('Part 1 Input', () => {
    expect(day16p1(input)).toBe('58100105');
  });

  test('Part 2 Input', () => {
    expect(day16p2(input)).toBe('41781287');
  });
});
