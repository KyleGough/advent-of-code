import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { sum } from '@utilities/reduce';
import { buildWorkflows, Rating, Workflow } from './day19.helper';

export const day19p1 = (input: string) => {
  const [workflowSection, partsSection] = input.split('\n\n');
  const workflows = buildWorkflows(workflowSection.split('\n'));
  const parts = partsSection.split('\n').map(parsePart);
  const acceptedParts = parts.filter((part) => testPart(part, workflows, 'in'));
  return acceptedParts.map(partValue).reduce(sum);
};

type Part = Record<Rating, number>;

const operationFns = {
  '>': (a: number, b: number) => a > b,
  '<': (a: number, b: number) => a < b,
};

const testPart = (
  part: Part,
  workflows: Record<string, Workflow>,
  wf: string
): boolean => {
  if (wf === 'A') {
    return true;
  } else if (wf === 'R') {
    return false;
  }

  const { rules, fallback } = workflows[wf];

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    const ratingValue = part[rule.rating];

    if (operationFns[rule.operation](ratingValue, rule.value)) {
      return testPart(part, workflows, rule.next);
    }
  }

  return testPart(part, workflows, fallback);
};

const partValue = (part: Part): number => {
  return part.x + part.m + part.a + part.s;
};

const parsePart = (input: string): Part => {
  const partMatch = input.match(
    /x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)/
  )?.groups;

  if (!partMatch) {
    throw new Error('Unable to parse part.');
  }

  return {
    x: parseInt(partMatch.x),
    m: parseInt(partMatch.m),
    a: parseInt(partMatch.a),
    s: parseInt(partMatch.s),
  };
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 383682
