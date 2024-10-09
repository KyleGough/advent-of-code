import { day14p1 } from './p1';
import { day14p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 14 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day14p1('5')).toBe('0124515891');
    expect(day14p1('9')).toBe('5158916779');
    expect(day14p1('18')).toBe('9251071085');
    expect(day14p1('2018')).toBe('5941429882');
  });

  test('Part 1 Input', () => {
    expect(day14p1(input)).toBe('7116398711');
  });

  test('Part 2 Example', () => {
    expect(day14p2('01245')).toBe(5);
    expect(day14p2('51589')).toBe(9);
    expect(day14p2('92510')).toBe(18);
    expect(day14p2('59414')).toBe(2018);
  });

  test('Part 2 Input', () => {
    expect(day14p2(input)).toBe(20_316_365);
  });
});
