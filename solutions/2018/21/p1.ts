import { run } from '@utilities/run';
import { findOverflowCodes } from './day21.helper';

export const day21p1 = () => {
  const codes = findOverflowCodes();
  return codes[0];
};

run(() => day21p1()); // 6778585
