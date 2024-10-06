import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day25p1 = (input: string) => {
  const publicKeys = input.split('\n').map(Number);
  const loopSize = getLoopSize(7, publicKeys[0]);
  return getEncryptionKey(publicKeys[1], loopSize);
};

const getLoopSize = (subjectNumber: number, publicKey: number): number => {
  let value = 1;
  let loopSize = 0;

  while (value != publicKey) {
    value = (value * subjectNumber) % 20201227;
    loopSize += 1;
  }

  return loopSize;
};

const getEncryptionKey = (subjectNumber: number, loopSize: number): number => {
  let value = 1;

  for (let i = 0; i < loopSize; i++) {
    value = (value * subjectNumber) % 20201227;
  }

  return value;
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 4441893
