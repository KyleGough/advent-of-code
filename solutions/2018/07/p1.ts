import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { DependencyGraph, parseDependency } from './day07.helper';

export const day07p1 = (input: string) => {
  const dependencies = input.split('\n').map(parseDependency);
  const graph = new DependencyGraph(dependencies);
  const order = [];

  while (graph.remainingStepCount()) {
    const nextStep = graph.nextStep();
    order.push(nextStep);
    graph.removeStep(nextStep);
  }

  return order.join('');
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // BFGKNRTWXIHPUMLQVZOYJACDSE
