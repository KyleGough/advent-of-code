import { day20p1 } from './p1';
import { day20p2 } from './p2';
import { getPuzzle } from '@utilities/getPuzzle';

const { input } = getPuzzle(__dirname);

describe('Day 20 Puzzle', () => {
  test('Part 1 Example', () => {
    expect(day20p1('^WNE$')).toBe(3);
    expect(day20p1('^ENWWW(NEEE|SSE(EE|N))$')).toBe(10);
    expect(day20p1('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$')).toBe(18);
    expect(day20p1('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$')).toBe(23);
    expect(day20p1('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$')).toBe(31);
  });

  test('Part 1 Input', () => {
    expect(day20p1(input)).toBe(4214);
  });

  test.skip('Part 2 Input', () => {
    expect(day20p2(input)).toBe(0);
  });
});
