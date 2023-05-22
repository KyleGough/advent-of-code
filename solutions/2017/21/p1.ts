import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { enhanceImage } from './day21.helper';

export const day21p1 = (input: string) => enhanceImage(input, 5);

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 208
