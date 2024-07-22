import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRules, Rule } from './day07.helper';

export const day07p1 = (input: string) => {
  const ruleMap = parseRules(input);

  const queue = Object.values(ruleMap).filter((r) => !r.contents.length);

  while (queue.length) {
    const { container } = queue.pop() as Rule;

    if (container === 'shiny gold') continue;

    for (const candidate of Object.keys(ruleMap)) {
      const candidateContainer = ruleMap[candidate];

      if (candidateContainer) {
        // Remove empty container from bag contents.
        candidateContainer.contents = candidateContainer.contents.filter(
          (r) => r.bag !== container
        );

        if (!candidateContainer.contents.length) {
          queue.push(candidateContainer);
          delete ruleMap[candidateContainer.container];
        }
      }
    }
  }

  return Object.keys(ruleMap).length;
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // 296
