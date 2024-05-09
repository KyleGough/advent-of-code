import { run } from '@utilities/run';
import { findOverflowCodes } from './day21.helper';

export const day21p2 = () => {
  const codes = findOverflowCodes();
  return codes[codes.length - 1];
};

run(() => day21p2()); // 6534225
