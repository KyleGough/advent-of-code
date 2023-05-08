import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { knotHash } from './day10.helper';

export const day10p2 = (input: string) => {
  const lengths = input.split('').map((i) => i.charCodeAt(0));
  lengths.push(...[17, 31, 73, 47, 23]);
  const list = knotHash(lengths, 0, 0, 256, 64);
  const denseHash = [];

  for (let i = 0; i < 16; i++) {
    const section = list.slice(i * 16, i * 16 + 16);
    const xorSection = section.reduce((prev, curr) => prev ^ curr);
    denseHash.push(xorSection.toString(16));
  }

  return denseHash.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 20b7b54c92bf73cf3e5631458a715149
