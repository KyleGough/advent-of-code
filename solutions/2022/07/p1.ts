import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { Node, buildDirectoryTree } from './day07.helper';

export const day07p1 = (input: string) => {
  const commands = input.split('\n');
  const root = buildDirectoryTree(commands);
  let sumDirectoryConstraint = 0;

  const calculateDirectorySize = (node: Node): number => {
    if (node.isDirectory) {
      const directorySize = node.children
        .map((child) => calculateDirectorySize(child))
        .reduce(sum);
      if (directorySize <= 100000) {
        sumDirectoryConstraint += directorySize;
      }
      node.filesize = directorySize;
      return directorySize;
    } else {
      return node.filesize;
    }
  };

  calculateDirectorySize(root);
  return sumDirectoryConstraint;
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // 1770595
