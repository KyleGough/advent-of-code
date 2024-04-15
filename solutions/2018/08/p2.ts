import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day08p2 = (input: string) => {
  const nums = input.split(' ').map((i) => parseInt(i));
  return parseNode(nums)[1];
};

const parseNode = (nums: number[]): [number[], number] => {
  if (!nums.length) return [[], 0];

  const initialNodeCount = nums[0];
  let nodeCount = initialNodeCount;
  const metadataCount = nums[1];

  let n = nums.slice(2);
  let value;

  const childNodeValues: number[] = [];

  while (nodeCount) {
    [n, value] = parseNode(n);
    childNodeValues.push(value);
    nodeCount -= 1;
  }

  const metadata = n.slice(0, metadataCount);
  const nextNums = n.slice(metadataCount);

  if (!initialNodeCount) {
    const metadataSum = metadata.reduce(sum);
    return [nextNums, metadataSum];
  } else {
    const nodeValues = metadata.map((i) => childNodeValues[i - 1] ?? 0);
    return [nextNums, nodeValues.reduce(sum)];
  }
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // 33422
