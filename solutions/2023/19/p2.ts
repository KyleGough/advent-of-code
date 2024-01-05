import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { product } from '@utilities/reduce';
import { buildWorkflows, Workflow } from './day19.helper';

export const day19p2 = (input: string) => {
  const [workflowSection] = input.split('\n\n');
  const workflows = buildWorkflows(workflowSection.split('\n'));
  return countCombos(ranges, workflows, 'in');
};

const ranges: Record<string, number[]> = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
};

const countCombos = (
  ranges: Record<string, number[]>,
  workflows: Record<string, Workflow>,
  wf: string
) => {
  if (wf === 'R') {
    return 0;
  }

  if (wf === 'A') {
    return Object.values(ranges)
      .map(([low, high]) => high - low + 1)
      .reduce(product, 1);
  }

  const { rules, fallback } = workflows[wf];

  let total = 0;

  for (let i = 0; i < rules.length; i++) {
    const { rating, value, next, operation } = rules[i];
    const [low, high] = ranges[rating];

    let trueRange = [];
    let falseRange = [];

    if (operation === '<') {
      trueRange = [low, value - 1];
      falseRange = [value, high];
    } else {
      trueRange = [value + 1, high];
      falseRange = [low, value];
    }

    if (trueRange[0] <= trueRange[1]) {
      const nextRange = { ...ranges, [rating]: trueRange };
      total += countCombos(nextRange, workflows, next);
    }

    if (falseRange[0] <= falseRange[1]) {
      ranges = { ...ranges, [rating]: falseRange };
    } else {
      break;
    }
  }

  total += countCombos(ranges, workflows, fallback);

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 117954800808317
