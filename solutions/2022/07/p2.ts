import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { Node, buildDirectoryTree } from './day07.helper';

const findDirectoryToDelete = (node: Node, amountToFree: number): Node => {
  const children = node.children
    .filter((i) => i.isDirectory && i.filesize >= amountToFree)
    .map((i) => findDirectoryToDelete(i, amountToFree));

  if (children.length) {
    let currentMin = node.filesize;
    let currentMinNode = node;

    for (let i = 0; i < children.length; i++) {
      if (children[i].filesize < currentMin) {
        currentMin = children[i].filesize;
        currentMinNode = children[i];
      }
    }
    return currentMinNode;
  } else {
    return node;
  }
};

export const day07p2 = (input: string) => {
  const commands = input.split('\n');
  const root = buildDirectoryTree(commands);

  const calculateDirectorySize = (node: Node): number => {
    if (node.isDirectory) {
      const directorySize = node.children
        .map((child) => calculateDirectorySize(child))
        .reduce(sum);
      node.filesize = directorySize;
      return directorySize;
    } else {
      return node.filesize;
    }
  };

  const totalDisk = 70_000_000;
  const requiredDisk = 30_000_000;
  const totalUsedDisk = calculateDirectorySize(root);
  const amountToFree = totalUsedDisk + requiredDisk - totalDisk;

  return findDirectoryToDelete(root, amountToFree).filesize;
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 2195372
