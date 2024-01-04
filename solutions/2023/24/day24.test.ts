import { day24p1 } from './p1';
import { day24p2 } from './p2';
import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { customConfig } from './customConfig';

const { example, input } = getPuzzleWithConfig(__dirname, customConfig);

describe('Day 24 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day24p1(...example)).toBe(2);
  });

  test('Part 1 Input', () => {
    expect(day24p1(...input)).toBe(15107);
  });

  test('Part 2 Example', async () => {
    day24p2(example[0]).then((result) => expect(result).toBe(47));
  });

  test('Part 2 Input', async () => {
    day24p2(input[0]).then((result) =>
      expect(result).toBe(856_642_398_547_748)
    );
  }, 30000);
});
