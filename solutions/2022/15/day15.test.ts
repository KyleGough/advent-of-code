import { day15p1 } from './p1';
import { day15p2 } from './p2';
import { getPuzzleWithCustomInput } from '@utilities/getPuzzle';
import { customInput } from './customInput';

const { example, input } = getPuzzleWithCustomInput(__dirname, customInput);

describe('Day 15 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day15p1(...example)).toBe(26);
  });

  test('Part 1 Input', () => {
    expect(day15p1(...input)).toBe(4_717_631);
  });

  test('Part 2 Example', () => {
    expect(day15p2(...example)).toBe(56_000_011);
  });

  test('Part 2 Input', () => {
    expect(day15p2(...input)).toBe(13_197_439_355_220);
  });
});
