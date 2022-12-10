import { day10p1 } from './p1';
import { day10p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

const p2ExampleExpected = `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

const p2InputExpected = `
####.###..#..#.###..#..#.####..##..#..#.
#....#..#.#..#.#..#.#..#....#.#..#.#..#.
###..###..#..#.#..#.####...#..#....####.
#....#..#.#..#.###..#..#..#...#....#..#.
#....#..#.#..#.#.#..#..#.#....#..#.#..#.
#....###...##..#..#.#..#.####..##..#..#.`;

describe('Day 10 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day10p1(example)).toBe(13140);
  });

  test('Part 1 Input', () => {
    expect(day10p1(input)).toBe(13720);
  });

  test('Part 2 Example', () => {
    expect(day10p2(example)).toBe(p2ExampleExpected);
  });

  test('Part 2 Input', () => {
    expect(day10p2(input)).toBe(p2InputExpected);
  });
});
