import { day11p1 } from './p1';
import { day11p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

const p2InputExpected = [
  '.##...##..###....##..##...##...##..#...',
  '#..#.#..#.#..#....#.#..#.#..#.#..#.#...',
  '#....#....#..#....#.#....#....#....#...',
  '#....#.##.###.....#.#....#.##.#....#...',
  '#..#.#..#.#....#..#.#..#.#..#.#..#.#...',
  '.##...###.#.....##...##...###..##..####',
].join('\n');

describe('Day 11 Puzzle', () => {
  test('Part 1 Input', () => {
    expect(day11p1(input)).toBe(1876);
  });

  test('Part 2 Input', () => {
    expect(day11p2(input)).toBe(p2InputExpected);
  });
});
