import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { buildGraph, isLargeCave } from './day12.helper';

export const day12p1 = (input: string) => {
  const graph = buildGraph(input);
  const paths: string[][] = [];
  const queue: QueueItem[] = [{ node: 'start', history: ['start'] }];

  while (queue.length) {
    const { node, history } = queue.pop() as QueueItem;

    if (node === 'end') {
      paths.push(history);
      continue;
    }

    for (let neighbour of graph[node]) {
      if (isLargeCave(neighbour)) {
        queue.push({ node: neighbour, history: [...history, neighbour] });
      } else if (!history.includes(neighbour)) {
        queue.push({ node: neighbour, history: [...history, neighbour] });
      }
    }
  }

  return paths.length;
};

interface QueueItem {
  node: string;
  history: string[];
}

const input = getPuzzle(__dirname).input;
run(() => day12p1(input)); // TODO
