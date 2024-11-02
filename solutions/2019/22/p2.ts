import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction } from './day22.helper';
import { modulo } from '@utilities/modulo';

export const day22p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const SIZE = 119_315_717_514_047;

  let offset = 0;
  let increment = 1;

  for (const instruction of instructions.reverse()) {
    switch (instruction.type) {
      case 'CUT':
        offset = modulo(offset + instruction.value, SIZE);
        break;
      case 'DEAL':
        offset = moduloDivide(offset, instruction.value, SIZE);
        increment = moduloDivide(increment, instruction.value, SIZE);
        break;
      case 'DEAL_STACK':
        offset = modulo(-offset - 1, SIZE);
        increment = modulo(-increment, SIZE);
        break;
    }
  }

  let shuffles = 101_741_582_076_661;
  let index = 2020;

  while (shuffles) {
    if (shuffles % 2 !== 0) {
      index = moduloMultiply(index, increment, SIZE);
      index = modulo(index + offset, SIZE);
    }

    offset = (moduloMultiply(increment, offset, SIZE) + offset) % SIZE;
    increment = moduloMultiply(increment, increment, SIZE);
    shuffles = Math.floor(shuffles / 2);
  }

  return index;
};

const moduloMultiply = (a: number, b: number, m: number): number => {
  return Number((BigInt(a) * BigInt(b)) % BigInt(m));
};

const moduloDivide = (a: number, b: number, m: number): number => {
  return Number((BigInt(a) * BigInt(modInverse(b, m))) % BigInt(m));
};

const gcdExtended = (a: number, b: number): number[] => {
  let x = 0;
  let y = 1;
  let u = 1;
  let v = 0;

  while (a !== 0) {
    const q = Math.floor(b / a);
    [x, y, u, v] = [u, v, x - u * q, y - v * q];
    [a, b] = [b % a, a];
  }

  return [b, x, y];
};

const modInverse = (a: number, m: number): number => {
  const x = gcdExtended(a, m)[1];
  return modulo(x + m, m);
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 41685581334351
