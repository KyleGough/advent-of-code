import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRelationship, buildTree } from './day07.helper';

export const day07p1 = (input: string) => {
  const relationships = input.split('\n').map(parseRelationship);
  return buildTree(relationships).id;
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // vmpywg
