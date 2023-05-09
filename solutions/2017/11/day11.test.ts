import { day11p1 } from './p1';
import { day11p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 11 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day11p1('ne,ne,ne')).toBe(3);
    expect(day11p1('ne,ne,sw,sw')).toBe(0);
    expect(day11p1('ne,ne,s,s')).toBe(2);
    expect(day11p1('se,sw,se,sw,sw')).toBe(3);
  });

  test('Part 1 Input', () => {
    expect(day11p1(input)).toBe(759);
  });

  test('Part 2 Input', () => {
    expect(day11p2(input)).toBe(1501);
  });
});
