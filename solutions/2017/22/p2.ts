import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { modulo } from '@utilities/modulo';
import { InfiniteGrid } from './day22.helper';

enum NodeState {
  CLEAN,
  WEAKENED,
  INFECTED,
  FLAGGED,
}

const mapToNodeState = (input: string): NodeState =>
  input === '#' ? NodeState.INFECTED : NodeState.CLEAN;

export const day22p2 = (input: string) => {
  const grid = new InfiniteGrid(
    input,
    mapToNodeState,
    NodeState.INFECTED,
    NodeState.CLEAN
  );

  for (let i = 0; i < 10_000_000; i++) {
    switch (grid.get()) {
      case NodeState.CLEAN:
        grid.virus.direction--;
        grid.set(NodeState.WEAKENED);
        break;
      case NodeState.WEAKENED:
        grid.set(NodeState.INFECTED);
        break;
      case NodeState.INFECTED:
        grid.virus.direction++;
        grid.set(NodeState.FLAGGED);
        break;
      case NodeState.FLAGGED:
        grid.virus.direction += 2;
        grid.set(NodeState.CLEAN);
        break;
    }

    grid.virus.direction = modulo(grid.virus.direction, 4);
    grid.move();
  }

  return grid.infectionCount;
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 2511722
