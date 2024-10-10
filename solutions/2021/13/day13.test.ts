import { day13p1 } from './p1';
import { day13p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { example, input } = getPuzzle(__dirname);

const p2InputExpected = [
  '###  #### #### #  # ###   ##  #### ### ',
  '#  #    # #    #  # #  # #  # #    #  #',
  '#  #   #  ###  #### #  # #  # ###  #  #',
  '###   #   #    #  # ###  #### #    ### ',
  '#    #    #    #  # # #  #  # #    # # ',
  '#    #### #### #  # #  # #  # #### #  #',
].join('\n');

describe('Day 13 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day13p1(example)).toBe(17);
  });

  test('Part 1 Input', () => {
    expect(day13p1(input)).toBe(814);
  });

  test('Part 2 Input', () => {
    expect(day13p2(input)).toBe(p2InputExpected);
  });
});
