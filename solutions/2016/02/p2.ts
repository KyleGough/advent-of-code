import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getKeypadButton } from './day02.helper';

export const day02p2 = (input: string) => {
  const lines = input.split('\n');

  const keypad = [
    ['', '', '1', '', ''],
    ['', '2', '3', '4', ''],
    ['5', '6', '7', '8', '9'],
    ['', 'A', 'B', 'C', ''],
    ['', '', 'D', '', ''],
  ];

  return getKeypadButton(lines, keypad);
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // 8B8B1
