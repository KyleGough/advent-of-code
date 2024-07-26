import { day14p1 } from './p1';
import { day14p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, example2, input } = getPuzzle(__dirname);

describe('Day 14 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day14p1(example)).toBe(165);
  });

  test('Part 1 Input', () => {
    expect(day14p1(input)).toBe(14_954_914_379_452);
  });

  test('Part 2 Example', () => {
    expect(day14p2(example2)).toBe(208);
  });

  test('Part 2 Input', () => {
    expect(day14p2(input)).toBe(3_415_488_160_714);
  });
});
