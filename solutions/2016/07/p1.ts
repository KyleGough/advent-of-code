import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day07p1 = (input: string) => {
  const abbaTest = /([a-z])(?!\1)([a-z])\2\1/;
  const hypernetTest = /\[[a-z]*([a-z])(?!\1)([a-z])\2\1[a-z]*\]/;
  const ipList = input.split('\n');

  return ipList
    .map((ip) => abbaTest.test(ip) && !hypernetTest.test(ip))
    .reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // 110
