import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { trueCount } from '@utilities/reduce';
import { convertToRegex, parseRules } from './day19.helper';

export const day19p1 = (input: string) => {
  const [ruleSection, messageSection] = input.split('\n\n');
  const rules = parseRules(ruleSection);
  const regex = convertToRegex(rules);
  const messages = messageSection.split('\n');
  return messages.map((m) => regex.test(m)).reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 224
