import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseGenerators, generator } from './day15.helper';

export const day15p2 = (input: string) => {
  const [genA, genB] = parseGenerators(input);
  let matchCount = 0;

  const itA = generator(genA, 16807, 4);
  const itB = generator(genB, 48271, 8);

  for (let i = 0; i < 5_000_000; i++) {
    const genAValue = itA.next();
    const genBValue = itB.next();

    if (genAValue.value === genBValue.value) {
      matchCount++;
    }
  }

  return matchCount;
};

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 328
