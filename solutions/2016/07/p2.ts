import { getPuzzle } from '@utilities/getPuzzle';
import { trueCount } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day07p2 = (input: string) => {
  const sslPreTest = /\[[a-z]*([a-z])(?!\1)([a-z])\1.*\][a-z]*\2\1\2/;
  const sslPostTest = /([a-z])(?!\1)([a-z])\1(?=[a-z]*\[).*\[[a-z]*\2\1\2/;
  const ipList = input.split('\n');

  return ipList
    .map((ip) => sslPreTest.test(ip) || sslPostTest.test(ip))
    .reduce(trueCount, 0);
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 242
