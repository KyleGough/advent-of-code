import { getPuzzleWithConfig } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { customConfig } from './customConfig';
import { DependencyGraph, parseDependency } from './day07.helper';

interface Worker {
  step?: string;
  timeLeft: number;
}

interface Config {
  delay: number;
  workerCount: number;
}

export const day07p2 = (input: string, config: Config) => {
  const dependencies = input.split('\n').map(parseDependency);
  const graph = new DependencyGraph(dependencies);
  const order: string[] = [];

  let workers: Worker[] = [];
  for (let i = 0; i < config.workerCount; i++) {
    const step = graph.nextStep();
    workers.push({
      step,
      timeLeft: getDuration(step, config.delay),
    });
  }

  let time = 0;

  while (graph.remainingStepCount()) {
    workers = workers.map((worker: Worker) => {
      // Reduce time left of current step.
      if (worker.timeLeft) {
        return {
          step: worker.step,
          timeLeft: worker.timeLeft - 1,
        };
      }

      // Remove step.
      if (worker.step) {
        graph.removeStep(worker.step);
        order.push(worker.step);
      }

      // Find next step.
      const nextStep = graph.nextStep();
      return {
        step: nextStep,
        timeLeft: nextStep ? getDuration(nextStep, config.delay) : 0,
      };
    });

    time += 1;
  }

  return time;
};

const getDuration = (step: string, delay: number): number => {
  return step ? step.charCodeAt(0) - 65 + delay : 0;
};

const input = getPuzzleWithConfig(__dirname, customConfig).input;
run(() => day07p2(...input)); // 1163
