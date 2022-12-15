import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { inspectItem, Monkey, parseMonkey } from './day11.helper';

const relieveWorry = (worry: number): number => Math.floor(worry / 3);

export const day11p1 = (input: string) => {
  const monkeys: Monkey[] = input.split('\n\n').map(parseMonkey);

  // Spectate 20 rounds of monkey business.
  for (let round = 0; round < 20; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const activeMonkey = monkeys[i];

      while (activeMonkey.itemList.length) {
        const item = activeMonkey.itemList[0];
        let worry = item;

        worry = inspectItem(worry, activeMonkey);
        worry = relieveWorry(worry);

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
run(() => day11p1(input)); // 55216
