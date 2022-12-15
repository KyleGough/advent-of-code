import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

class Node {
  name: string;
  isDirectory: boolean;
  filesize: number;
  children: Node[];
  parent?: Node;

  constructor(name: string, isDirectory: boolean, parent?: Node, filesize = 0) {
    this.name = name;
    this.isDirectory = isDirectory;
    this.filesize = filesize;
    this.children = [];
    this.parent = parent;
  }
}

const cd = (directory: string, root: Node, current: Node) => {
  if (directory === '/') {
    return root;
  } else if (directory === '..') {
    return current.parent || current;
  } else {
    return current.children.find((i) => i.name === directory) || current;
  }
};

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

  const root = new Node('/', true, undefined);
  let current = root;

  for (let i = 0; i < commands.length; i++) {
    const commandSyntax = commands[i].split(' ');

    if (commandSyntax[0] === '$') {
      if (commandSyntax[1] === 'cd') {
        current = cd(commandSyntax[2], root, current);
      }
    } else {
      const filename = commandSyntax[1];

      if (commandSyntax[0] === 'dir') {
        // Add directory to tree.
        current.children.push(new Node(filename, true, current));
      } else {
        // Add file to tree.
        current.children.push(
          new Node(filename, false, current, parseInt(commandSyntax[0]))
        );
      }
    }
  }

  const calculateDirectorySize = (node: Node): number => {
    if (node.isDirectory) {
      const directorySize = node.children
        .map((child) => calculateDirectorySize(child))
        .reduce((prev, curr) => prev + curr, 0);
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
