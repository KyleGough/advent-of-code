import { getPuzzle } from '@utilities/getPuzzle';
import { product } from '@utilities/reduce';
import { run } from '@utilities/run';
import { inspectItem, Monkey, parseMonkey } from './day11.helper';

export const day11p2 = (input: string) => {
  const monkeys: Monkey[] = input.split('\n\n').map(parseMonkey);

  const productDivisible = monkeys
    .map((i) => i.testDivisible)
    .reduce(product, 1);

  // Spectate 10000 rounds of monkey business.
  for (let round = 0; round < 10000; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const activeMonkey = monkeys[i];

      while (activeMonkey.itemList.length) {
        const item = activeMonkey.itemList[0];
        let worry = item;

        worry = inspectItem(worry, activeMonkey);
        worry = worry % productDivisible;

        activeMonkey.itemList = activeMonkey.itemList.slice(1);

        // Pass item to next monkey.
        if (worry % activeMonkey.testDivisible === 0) {
          monkeys[activeMonkey.trueThrow].itemList.push(worry);
        } else {
          monkeys[activeMonkey.falseThrow].itemList.push(worry);
        }

        activeMonkey.inspectCount++;
      }
    }
  }

  const inspectionCounts = monkeys
    .map((i) => i.inspectCount)
    .sort((a, b) => b - a);

  return inspectionCounts[0] * inspectionCounts[1];
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 12848882750
