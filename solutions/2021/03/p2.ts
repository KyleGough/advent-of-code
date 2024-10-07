import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { countDigits } from './day03.helper';

export const day03p2 = (input: string) => {
  const nums = input.split('\n');
  const oxygenRate = getDiagnosticRate(nums, true);
  const co2Rate = getDiagnosticRate(nums, false);
  return parseInt(oxygenRate, 2) * parseInt(co2Rate, 2);
};

const getDiagnosticRate = (nums: string[], mostCommon: boolean): string => {
  let options = nums.slice(0);
  const length = options[0].length;

  for (let i = 0; i < length; i++) {
    const digits = options.map((option) => option.charAt(i));
    const [zeroCount, oneCount] = countDigits(digits);
    const filter =
      (zeroCount > oneCount && mostCommon) ||
      (zeroCount <= oneCount && !mostCommon)
        ? '0'
        : '1';
    options = options.filter((option) => option.charAt(i) === filter);
    if (options.length === 1) {
      break;
    }
  }

  return options[0];
};

const input = getPuzzle(__dirname).input;
run(() => day03p2(input)); // 4790390
