import { day06p1 } from './p1';
import { day06p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

describe('Day 06 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day06p1(example)).toBe(5934);
  });

  test('Part 1 Input', () => {
    expect(day06p1(input)).toBe(396210);
  });

  test('Part 2 Example', () => {
    expect(day06p2(example)).toBe(26_984_457_539);
  });

  test('Part 2 Input', () => {
    expect(day06p2(input)).toBe(1_770_823_541_496);
  });
});
