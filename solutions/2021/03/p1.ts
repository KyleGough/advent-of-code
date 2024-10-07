import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countDigits } from './day03.helper';

export const day03p1 = (input: string) => {
  const nums = input.split('\n');
  const [gammaRate, epsilonRate] = getDiagnosticRates(nums);
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const getDiagnosticRates = (
  nums: string[]
): [gammaRate: string, epsilonRate: string] => {
  const length = nums[0].length;
  let gammaRate = '';
  let epsilonRate = '';

  for (let i = 0; i < length; i++) {
    const digits = nums.map((num) => num.charAt(i));
    const [zeroCount, oneCount] = countDigits(digits);

    gammaRate += zeroCount > oneCount ? '0' : '1';
    epsilonRate += zeroCount > oneCount ? '1' : '0';
  }

  return [gammaRate, epsilonRate];
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 841526
