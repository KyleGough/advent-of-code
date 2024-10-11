import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countChars } from '@utilities/string';
import { parseRules } from './day14.helper';

export const day14p1 = (input: string) => {
  const [template, ruleData] = input.split('\n\n');
  const rules = parseRules(ruleData);
  let polymer = template.split('');

  for (let i = 0; i < 10; i++) {
    polymer = growPolymer(polymer, rules);
  }

  const counts = countChars(polymer.join(''));
  const sortedCounts = Object.values(counts).sort((a, b) => b - a);
  return sortedCounts[0] - sortedCounts[sortedCounts.length - 1];
};

const growPolymer = (
  polymer: string[],
  rules: Record<string, string>
): string[] => {
  const insert: string[] = [];
  const output: string[] = [];

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer.slice(i, i + 2).join('');
    insert.push(rules[pair]);
  }

  for (let i = 0; i < insert.length; i++) {
    output.push(polymer[i]);
    output.push(insert[i]);
  }

  output.push(polymer[polymer.length - 1]);

  return output;
};

const input = getPuzzle(__dirname).input;
run(() => day14p1(input)); // 3247
