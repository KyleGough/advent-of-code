import { day08p1 } from './p1';
import { day08p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

const p2InputExpected = [
  '####.####.####.#...##..#.####.###..####..###...##.',
  '#....#....#....#...##.#..#....#..#.#......#.....#.',
  '###..###..###...#.#.##...###..#..#.###....#.....#.',
  '#....#....#......#..#.#..#....###..#......#.....#.',
  '#....#....#......#..#.#..#....#.#..#......#..#..#.',
  '####.#....####...#..#..#.#....#..#.#.....###..##..',
].join('\n');

describe('Day 08 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day08p1(input)).toBe(115);
  });

  test('Part 2 Input', () => {
    expect(day08p2(input)).toBe(p2InputExpected);
  });
});
