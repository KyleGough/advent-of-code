import { day07p1 } from './p1';
import { day07p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 07 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day07p1(example[0])).toBe('CABDFE');
  });

  test('Part 1 Input', () => {
    expect(day07p1(input[0])).toBe('BFGKNRTWXIHPUMLQVZOYJACDSE');
  });

  test('Part 2 Example', () => {
    expect(day07p2(...example)).toBe(15);
  });

  test('Part 2 Input', () => {
    expect(day07p2(...input)).toBe(1163);
  });
});
