import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { buildTree, parseRelationship, Node } from './day07.helper';

export const day07p2 = (input: string) => {
  const relationships = input.split('\n').map(parseRelationship);
  const root = buildTree(relationships);
  calculateWeights(root);
  return weightDiff(root, 0);
};

const weightDiff = (node: Node, siblingWeight: number): number => {
  const childWeights = node.children.map((i) => i.totalWeight);

  const oddOneOutIndex = childWeights.findIndex(
    (i) => childWeights.filter((w) => w === i).length === 1
  );

  if (oddOneOutIndex === -1) {
    return node.weight + siblingWeight - node.totalWeight;
  } else {
    return weightDiff(
      node.children[oddOneOutIndex],
      node.children[oddOneOutIndex === 0 ? 1 : 0].totalWeight
    );
  }
};

const calculateWeights = (node: Node) => {
  if (!node.children.length) {
    node.totalWeight = node.weight;
    return node.totalWeight;
  }

  let totalWeight = 0;
  for (const child of node.children) {
    totalWeight += calculateWeights(child);
  }

  node.totalWeight = totalWeight + node.weight;
  return node.totalWeight;
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 1674
