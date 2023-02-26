import { day05p1 } from './p1';
import { day05p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 05 Puzzle', () => {
  test.skip('Part 1 Example', () => {
    expect(day05p1(example)).toBe('18f47a30');
  });

  test.skip('Part 1 Input', () => {
    expect(day05p1(input)).toBe('f97c354d');
  });

  test.skip('Part 2 Example', () => {
    expect(day05p2(example)).toBe('05ace8e3');
  });

  test.skip('Part 2 Input', () => {
    expect(day05p2(input)).toBe('863dde27');
  });
});
