import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRules } from './day14.helper';

export const day14p2 = (input: string) => {
  const [polymer, ruleData] = input.split('\n\n');
  const rules = parseRules(ruleData);
  let pairCounts = countPairs(polymer);

  for (let i = 0; i < 40; i++) {
    pairCounts = growPolymer(pairCounts, rules);
  }

  const elementCounts = countElements(pairCounts);
  const sortedCounts = Object.values(elementCounts).sort((a, b) => b - a);
  return sortedCounts[0] - sortedCounts[sortedCounts.length - 1];
};

const countPairs = (polymer: string): Record<string, number> => {
  const counts: Record<string, number> = {};

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer.slice(i, i + 2);
    counts[pair] = (counts[pair] ?? 0) + 1;
  }

  return counts;
};

const growPolymer = (
  counts: Record<string, number>,
  rules: Record<string, string>
): Record<string, number> => {
  const nextCounts: Record<string, number> = {};

  for (const pair of Object.keys(counts)) {
    const firstPair = `${pair.charAt(0)}${rules[pair]}`;
    const secondPair = `${rules[pair]}${pair.charAt(1)}`;
    nextCounts[firstPair] = (nextCounts[firstPair] ?? 0) + counts[pair];
    nextCounts[secondPair] = (nextCounts[secondPair] ?? 0) + counts[pair];
  }

  return nextCounts;
};

const countElements = (
  pairCounts: Record<string, number>
): Record<string, number> => {
  const counts: Record<string, number> = {};

  for (const pair of Object.keys(pairCounts)) {
    const firstElement = pair[0];
    const secondElement = pair[1];
    counts[firstElement] = (counts[firstElement] ?? 0) + pairCounts[pair];
    counts[secondElement] = (counts[secondElement] ?? 0) + pairCounts[pair];
  }

  for (const element of Object.keys(counts)) {
    counts[element] = Math.ceil(counts[element] / 2);
  }

  return counts;
};

const input = getPuzzle(__dirname).input;
run(() => day14p2(input)); // 4110568157153
