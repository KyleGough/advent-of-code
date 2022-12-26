import { day04p1 } from './p1';
import { day04p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

// Tests are skipped for client and CI performance.
describe('Day 04 Puzzle', () => {
  test.skip('Part 1 Example', () => {
    expect(day04p1(example)).toBe(609_043);
  });

  test.skip('Part 1 Input', () => {
    expect(day04p1(input)).toBe(282_749);
  });

  test.skip('Part 2 Example', () => {
    expect(day04p2(example)).toBe(6_742_839);
  });

  test.skip('Part 2 Input', () => {
    expect(day04p2(input)).toBe(9_962_624);
  });
});
