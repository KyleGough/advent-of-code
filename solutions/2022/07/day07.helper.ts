export class Node {
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

export const buildDirectoryTree = (commands: string[]): Node => {
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

  return root;
};
