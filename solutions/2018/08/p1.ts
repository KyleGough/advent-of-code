import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day08p1 = (input: string) => {
  const nums = input.split(' ').map((i) => parseInt(i));
  return parseNode(nums)[1];
};

const parseNode = (nums: number[], total = 0): [number[], number] => {
  if (!nums.length) return [[], total];

  let nodeCount = nums[0];
  const metadataCount = nums[1];

  let n = nums.slice(2);
  let count;
  let childEntryCount = 0;

  while (nodeCount) {
    [n, count] = parseNode(n, 0);
    childEntryCount += count;
    nodeCount -= 1;
  }

  const metadataEntryCount = n.slice(0, metadataCount).reduce(sum);

  return [n.slice(metadataCount), childEntryCount + metadataEntryCount];
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 35852
