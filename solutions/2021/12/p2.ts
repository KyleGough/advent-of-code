import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { buildGraph, isLargeCave } from './day12.helper';

export const day12p2 = (input: string) => {
  const graph = buildGraph(input);
  const paths: string[][] = [];
  const queue: QueueItem[] = [
    { node: 'start', history: ['start'], twiceVisit: false },
  ];

  while (queue.length) {
    const { node, history, twiceVisit } = queue.pop() as QueueItem;

    if (node === 'end') {
      paths.push(history);
      continue;
    }

    for (const neighbour of graph[node]) {
      if (isLargeCave(neighbour) || neighbour === 'end') {
        queue.push({
          node: neighbour,
          history: [...history, neighbour],
          twiceVisit,
        });
      } else if (!history.includes(neighbour)) {
        queue.push({
          node: neighbour,
          history: [...history, neighbour],
          twiceVisit,
        });
      } else if (!twiceVisit) {
        queue.push({
          node: neighbour,
          history: [...history, neighbour],
          twiceVisit: true,
        });
      }
    }
  }

  return paths.length;
};

interface QueueItem {
  node: string;
  history: string[];
  twiceVisit: boolean;
}

const input = getPuzzle(__dirname).input;
run(() => day12p2(input)); // 84870
