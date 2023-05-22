import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { enhanceImage } from './day21.helper';

export const day21p2 = (input: string) => enhanceImage(input, 18);

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // 2480380
