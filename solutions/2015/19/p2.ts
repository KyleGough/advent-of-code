import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { replacementStep } from './day19.helper';

export const day19p2 = (input: string) => {
  const [replacements, molecule] = input.split('\n\n');
  const replacementList = replacements.split('\n').map((i) => {
    const map = i.split(' => ');
    return [map[1], map[0]];
  });

  let numReplacementSteps = 0;
  let currentMolecule = molecule;

  while (currentMolecule !== 'e') {
    currentMolecule = replacementStep(currentMolecule, replacementList)[0];
    numReplacementSteps++;
  }

  return numReplacementSteps;
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 200
