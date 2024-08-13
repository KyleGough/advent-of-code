import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { convertToRegex, parseRules } from './day19.helper';

export const day19p2 = (input: string) => {
  const [ruleSection, messageSection] = input.split('\n\n');
  const rules = parseRules(ruleSection);
  let messages = messageSection.split('\n');
  const messageCount = messages.length;

  rules['8'] = '([42])+';

  for (let i = 1; i < 8; i++) {
    rules['11'] = `([42]{${i}}[31]{${i}})`;
    const regex = convertToRegex({ ...rules });
    messages = messages.filter((m) => !regex.test(m));
  }

  return messageCount - messages.length;
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 436
