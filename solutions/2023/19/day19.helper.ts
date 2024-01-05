export type Rating = 'x' | 'm' | 'a' | 's';
type Operation = '>' | '<';

interface Rule {
  rating: Rating;
  value: number;
  next: string;
  operation: Operation;
}

export interface Workflow {
  name: string;
  rules: Rule[];
  fallback: string;
}

const parseWorkflow = (input: string): Workflow => {
  const workflowMatch = input.match(/(?<name>[a-z]+)\{(?<rules>.+)\}/)?.groups;

  if (!workflowMatch) {
    throw new Error('Unable to parse workflow.');
  }

  const rawRules = workflowMatch.rules.split(',');
  const rules = rawRules.slice(0, rawRules.length - 1).map(parseRule);

  return {
    name: workflowMatch.name,
    rules,
    fallback: rawRules[rawRules.length - 1],
  };
};

const parseRule = (input: string): Rule => {
  const ruleMatch = input.match(
    /(?<rating>x|m|a|s)(?<operation>\<|\>)(?<value>\d+)\:(?<next>.*)/
  )?.groups;

  if (!ruleMatch) {
    throw new Error('Unable to parse rule.');
  }

  return {
    rating: ruleMatch.rating as Rating,
    value: parseInt(ruleMatch.value),
    next: ruleMatch.next,
    operation: ruleMatch.operation as Operation,
  };
};

export const buildWorkflows = (
  workflowList: string[]
): Record<string, Workflow> => {
  return workflowList.map(parseWorkflow).reduce((prev, curr) => {
    return {
      ...prev,
      [curr.name]: curr,
    };
  }, {});
};
