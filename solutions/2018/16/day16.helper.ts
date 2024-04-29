import { matchNumbers } from '@utilities/string';

export interface Sample {
  before: number[];
  after: number[];
  opcode: number;
  a: number;
  b: number;
  c: number;
}

export const operations = [
  'addr',
  'addi',
  'mulr',
  'muli',
  'banr',
  'bani',
  'borr',
  'bori',
  'setr',
  'seti',
  'gtir',
  'gtri',
  'gtrr',
  'eqir',
  'eqri',
  'eqrr',
] as const;

export type Operation = (typeof operations)[number];

export const parseSample = (sampleText: string): Sample => {
  const lines = sampleText.split('\n');
  const before = matchNumbers(lines[0]);
  const instruction = matchNumbers(lines[1]);
  const after = matchNumbers(lines[2]);

  return {
    before,
    after,
    opcode: instruction[0],
    a: instruction[1],
    b: instruction[2],
    c: instruction[3],
  };
};

export const performOperation = (
  op: Operation,
  sample: Omit<Sample, 'after' | 'opcode'>
): number[] => {
  const { a, b, c, before: register } = sample;
  const result = [...register];

  switch (op) {
    case 'addr':
      result[c] = register[a] + register[b];
      break;
    case 'addi':
      result[c] = register[a] + b;
      break;
    case 'mulr':
      result[c] = register[a] * register[b];
      break;
    case 'muli':
      result[c] = register[a] * b;
      break;
    case 'banr':
      result[c] = register[a] & register[b];
      break;
    case 'bani':
      result[c] = register[a] & b;
      break;
    case 'borr':
      result[c] = register[a] | register[b];
      break;
    case 'bori':
      result[c] = register[a] | b;
      break;
    case 'setr':
      result[c] = register[a];
      break;
    case 'seti':
      result[c] = a;
      break;
    case 'gtir':
      result[c] = a > register[b] ? 1 : 0;
      break;
    case 'gtri':
      result[c] = register[a] > b ? 1 : 0;
      break;
    case 'gtrr':
      result[c] = register[a] > register[b] ? 1 : 0;
      break;
    case 'eqir':
      result[c] = a === register[b] ? 1 : 0;
      break;
    case 'eqri':
      result[c] = register[a] === b ? 1 : 0;
      break;
    case 'eqrr':
      result[c] = register[a] === register[b] ? 1 : 0;
      break;
  }

  return result;
};
