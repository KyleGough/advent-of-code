import { matchNumbers } from '@utilities/string';

type Instruction =
  | { type: 'DEAL_STACK' }
  | { type: 'CUT'; value: number }
  | { type: 'DEAL'; value: number };

export const parseInstruction = (input: string): Instruction => {
  if (input.startsWith('deal into')) {
    return { type: 'DEAL_STACK' };
  } else if (input.startsWith('deal with')) {
    return { type: 'DEAL', value: matchNumbers(input)[0] };
  } else {
    return { type: 'CUT', value: matchNumbers(input)[0] };
  }
};
