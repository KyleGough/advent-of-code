import { day20p1 } from './p1';
import { day20p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 20 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day20p1(example)).toBe(3);
  });

  test('Part 1 Input', () => {
    expect(day20p1(input)).toBe(7584);
  });

  test('Part 2 Example', () => {
    expect(day20p2(example)).toBe(1_623_178_306);
  });

  test('Part 2 Input', () => {
    expect(day20p2(input)).toBe(4_907_679_608_191);
  });
});
