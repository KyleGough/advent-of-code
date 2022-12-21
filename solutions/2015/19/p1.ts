import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { replacementStep } from './day19.helper';

export const day19p1 = (input: string) => {
  const [replacements, molecule] = input.split('\n\n');
  const replacementList = replacements.split('\n').map((i) => i.split(' => '));
  return replacementStep(molecule, replacementList).length;
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 518
