import { day09p1 } from './p1';
import { day09p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 09 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day09p1('{}')).toBe(1);
    expect(day09p1('{{{}}}')).toBe(6);
    expect(day09p1('{{},{}}')).toBe(5);
    expect(day09p1('{{{},{},{{}}}}')).toBe(16);
    expect(day09p1('{<a>,<a>,<a>,<a>}')).toBe(1);
    expect(day09p1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toBe(9);
    expect(day09p1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toBe(9);
    expect(day09p1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toBe(3);
  });

  test('Part 1 Input', () => {
    expect(day09p1(input)).toBe(16_827);
  });

  test('Part 2 Example', () => {
    expect(day09p2('<>')).toBe(0);
    expect(day09p2('<random characters>')).toBe(17);
    expect(day09p2('<<<<>')).toBe(3);
    expect(day09p2('<{!>}>')).toBe(2);
    expect(day09p2('<!!>')).toBe(0);
    expect(day09p2('<!!!>>')).toBe(0);
    expect(day09p2('<{o"i!a,<{i<a>')).toBe(10);
  });

  test('Part 2 Input', () => {
    expect(day09p2(input)).toBe(7298);
  });
});
