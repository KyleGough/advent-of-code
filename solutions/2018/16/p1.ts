import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  operations,
  parseSample,
  performOperation,
  Sample,
} from './day16.helper';

export const day16p1 = (input: string) => {
  const samplesText = input.split('\n\n\n\n')[0];
  const samples = samplesText.split('\n\n').map(parseSample);
  return samples.map(countValidOperations).filter((s) => s >= 3).length;
};

/**
 * Return the number of valid operations are valid for this sample
 */
const countValidOperations = (sample: Sample): number =>
  operations
    .map((op) => performOperation(op, sample).join(','))
    .filter((r) => r === sample.after.join(',')).length;

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 640
