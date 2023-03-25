export interface Node {
  x: number;
  y: number;
  size: number;
  used: number;
  avail: number;
  usage: number;
}

export const parseNode = (input: string): Node => {
  const nodeMatch = input.match(
    /x(?<x>\d+)-y(?<y>\d+)\s+(?<size>\d+)T\s+(?<used>\d+)T\s+(?<avail>\d+)T\s+(?<usage>\d+)%/
  )?.groups;

  if (!nodeMatch) throw new Error('Unable to parse node');

  return {
    x: parseInt(nodeMatch.x),
    y: parseInt(nodeMatch.y),
    size: parseInt(nodeMatch.size),
    used: parseInt(nodeMatch.used),
    avail: parseInt(nodeMatch.avail),
    usage: parseInt(nodeMatch.usage),
  };
};

export const getViablePairs = (nodes: Node[]): Set<string> => {
  const viablePairs = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;

      if (nodes[i].used > 0 && nodes[i].used <= nodes[j].avail) {
        viablePairs.add(
          `(${nodes[i].x},${nodes[i].y}) => (${nodes[j].x},${nodes[j].y})`
        );
      }
    }
  }

  return viablePairs;
};
