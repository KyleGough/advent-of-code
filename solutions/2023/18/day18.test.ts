import { day18p1 } from './p1';
import { day18p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 18 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day18p1(example)).toBe(62);
  });

  test('Part 1 Input', () => {
    expect(day18p1(input)).toBe(40131);
  });

  test('Part 2 Example', () => {
    expect(day18p2(example)).toBe(952_408_144_115);
  });

  test('Part 2 Input', () => {
    expect(day18p2(input)).toBe(104_454_050_898_331);
  });
});
