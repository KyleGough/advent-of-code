import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day19p2 = (input: string) => {
  const n = parseInt(input);
  const highestPower3 = 3 ** (n.toString(3).length - 1);
  const remainder = n - highestPower3;

  if (n === highestPower3) {
    return n;
  } else if (remainder <= highestPower3) {
    return remainder;
  } else {
    return highestPower3 + (n - 2 * highestPower3) * 2;
  }
};

// Test function used to generate results for n = 1..100 to get formula.
/*
const getLuckyElf = (elfCount: number): number => {
  let e = [...Array(elfCount).keys()].map((i) => ++i);

  while (e.length > 1) {
    const i = Math.floor(e.length / 2);
    e.splice(i, 1);
    e = [...e.slice(1), e[0]];
  }

  return e[0];
};
*/

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 1424135
