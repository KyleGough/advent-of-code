import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { hasRequiredKeys } from './day04.helper';

export const day04p1 = (input: string) => {
  const passports = input.split('\n\n');
  return passports.filter(hasRequiredKeys).length;
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 192
