export interface Relationship {
  weight: number;
  id: string;
  children: string[];
}

export const parseRelationship = (input: string): Relationship => {
  const [node, children] = input.split(' -> ');

  const relationshipMatch = node.match(
    /(?<node>[a-z]+) \((?<weight>\d+)\)/
  )?.groups;

  if (!relationshipMatch) throw new Error('Unable to parse relationship');

  return {
    weight: parseInt(relationshipMatch.weight),
    id: relationshipMatch.node,
    children: children?.split(', ') ?? [],
  };
};

export interface Node {
  id: string;
  weight: number;
  parent: Node | null;
  children: Node[];
  totalWeight: number;
}

export const buildTree = (relationships: Relationship[]): Node => {
  const tree: Record<string, Node> = {};

  // Build map of nodes.
  for (const relation of relationships) {
    tree[relation.id] = {
      id: relation.id,
      weight: relation.weight,
      parent: null,
      children: [],
      totalWeight: 0,
    };
  }

  // Build node links.
  for (const node of relationships) {
    for (const child of node.children) {
      tree[node.id].children.push(tree[child]);
      tree[child].parent = tree[node.id];
    }
  }

  // Find root node.
  let currentNode = tree[relationships[0].id];
  while (currentNode.parent) {
    currentNode = currentNode.parent;
  }

  return currentNode;
};
