import { Operation } from '../16/day16.helper';

interface Instruction {
  op: Operation;
  a: number;
  b: number;
  c: number;
}

export const getInstructionPointerIndex = (input: string): number => {
  const match = input.match(/\d/);

  if (!match) {
    throw new Error('Unable to parse IP declaration');
  }

  return parseInt(match[0]);
};

export const parseInstruction = (input: string): Instruction => {
  const [op, a, b, c] = input.split(' ');

  return {
    op: op as Operation,
    a: parseInt(a),
    b: parseInt(b),
    c: parseInt(c),
  };
};
