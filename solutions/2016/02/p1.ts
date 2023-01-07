import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getKeypadButton } from './day02.helper';

export const day02p1 = (input: string) => {
  const lines = input.split('\n');

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  return getKeypadButton(lines, keypad);
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 56983
