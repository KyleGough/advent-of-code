import { getPuzzleInput } from '@utilities/getPuzzleInput';

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

export const day07p1 = (input: string) => {
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

  let sumDirectoryConstraint = 0;

  const calculateDirectorySize = (node: Node): number => {
    if (node.isDirectory) {
      const directorySize = node.children
        .map((child) => calculateDirectorySize(child))
        .reduce((prev, curr) => prev + curr, 0);
      if (directorySize <= 100_000) {
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

const input = getPuzzleInput(__dirname).input;
console.log(day07p1(input)); // 1770595
