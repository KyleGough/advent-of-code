import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseFloors, assembleChips } from './day11.helper';

export const day11p1 = (input: string) => {
  const initialItems = parseFloors(input);
  return assembleChips(initialItems);
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 31
