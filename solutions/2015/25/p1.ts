import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

const parseInput = (input: string): [number, number] => {
  const match = input.match(/row (?<row>\d+), column (?<col>\d+)/)?.groups;

  if (!match) throw new Error('Unable to parse input');

  return [parseInt(match.col), parseInt(match.row)];
};

const getOrder = (col: number, row: number): number => {
  const a = (col * (col + 1)) / 2;
  const b = col * (row - 1);
  const c = ((row - 1) * (row - 2)) / 2;

  if (row === 1) {
    return a;
  } else if (row === 2) {
    return a + b;
  } else {
    return a + b + c;
  }
};

export const day25p1 = (input: string) => {
  const [col, row] = parseInput(input);
  return getCode(col, row);
};

const getCode = (col: number, row: number): number => {
  const order = getOrder(col, row);
  let value = 20151125;

  for (let i = 2; i <= order; i++) {
    value = (value * 252533) % 33554393;
  }

  return value;
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 2650453
