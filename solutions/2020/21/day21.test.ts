import { day21p1 } from './p1';
import { day21p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 21 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day21p1(example)).toBe(5);
  });

  test('Part 1 Input', () => {
    expect(day21p1(input)).toBe(2324);
  });

  test('Part 2 Example', () => {
    expect(day21p2(example)).toBe('mxmxvkd,sqjhc,fvjkl');
  });

  test('Part 2 Input', () => {
    expect(day21p2(input)).toBe('bxjvzk,hqgqj,sp,spl,hsksz,qzzzf,fmpgn,tpnnkc');
  });
});
