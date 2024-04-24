import { day10p1 } from './p1';
import { day10p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

const p1ExampleExpected = [
  '#...#..###',
  '#...#...#.',
  '#...#...#.',
  '#####...#.',
  '#...#...#.',
  '#...#...#.',
  '#...#...#.',
  '#...#..###',
].join('\n');

const p1InputExpected = [
  '.####....####...#.......######..#.......#....#...####...######',
  '#....#..#....#..#............#..#.......#....#..#....#..#.....',
  '#.......#.......#............#..#.......#....#..#.......#.....',
  '#.......#.......#...........#...#.......#....#..#.......#.....',
  '#.......#.......#..........#....#.......######..#.......#####.',
  '#..###..#..###..#.........#.....#.......#....#..#.......#.....',
  '#....#..#....#..#........#......#.......#....#..#.......#.....',
  '#....#..#....#..#.......#.......#.......#....#..#.......#.....',
  '#...##..#...##..#.......#.......#.......#....#..#....#..#.....',
  '.###.#...###.#..######..######..######..#....#...####...######',
].join('\n');

describe('Day 10 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day10p1(example)).toBe(p1ExampleExpected);
  });

  test('Part 1 Input', () => {
    expect(day10p1(input)).toBe(p1InputExpected);
  });

  test('Part 2 Example', () => {
    expect(day10p2(example)).toBe(3);
  });

  test('Part 2 Input', () => {
    expect(day10p2(input)).toBe(10144);
  });
});