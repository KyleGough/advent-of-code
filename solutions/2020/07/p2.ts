import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseRules, Rule } from './day07.helper';

export const day07p2 = (input: string) => {
  const ruleMap = parseRules(input);

  const queue = Object.values(ruleMap).filter((r) => !r.contents.length);

  while (queue.length) {
    const { container: emptyContainer, totalAmount: emptyAmount } =
      queue.pop() as Rule;

    for (const candidate of Object.keys(ruleMap)) {
      const candidateContainer = ruleMap[candidate];

      const idx = candidateContainer.contents.findIndex(
        (c) => c.bag === emptyContainer
      );

      if (idx >= 0) {
        // Update total amounts.
        candidateContainer.totalAmount = candidateContainer.totalAmount || 0;
        candidateContainer.totalAmount +=
          candidateContainer.contents[idx].amount * (emptyAmount + 1);

        // Remove empty container from bag contents.
        candidateContainer.contents = candidateContainer.contents.filter(
          (c) => c.bag !== emptyContainer
        );

        if (!candidateContainer.contents.length) {
          queue.push(candidateContainer);
        }
      }
    }
  }

  return ruleMap['shiny gold'].totalAmount;
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 9339
