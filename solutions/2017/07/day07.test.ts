import { day07p1 } from './p1';
import { day07p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 07 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day07p1(example)).toBe('tknk');
  });

  test('Part 1 Input', () => {
    expect(day07p1(input)).toBe('vmpywg');
  });

  test('Part 2 Example', () => {
    expect(day07p2(example)).toBe(60);
  });

  test('Part 2 Input', () => {
    expect(day07p2(input)).toBe(1674);
  });
});
