import { getPuzzle } from '@utilities/getPuzzle';
import { permutations } from '@utilities/permutations';
import { run } from '@utilities/run';

interface StackItem {
  value: number;
  child: number;
}

const formatInput = (input: string): string => {
  let formattedInput = input;

  const replacements = [
    'NS',
    'SN',
    'EW',
    'WE',
    ...permutations('NEWS'.split('')).map((p) => p.join('')),
  ];

  for (const replacement of replacements) {
    formattedInput = formattedInput.replaceAll(replacement, '');
  }

  return formattedInput;
};

export const day20p1 = (input: string) => {
  const stack: StackItem[] = [{ value: 0, child: 0 }];

  let formattedInput = input;
  let formatComplete = false;

  // Formats input by replacing simple loops.
  while (!formatComplete) {
    const nextInput = formatInput(formattedInput);
    if (nextInput === formattedInput) {
      formatComplete = true;
    } else {
      formattedInput = nextInput;
    }
  }

  for (const char of formattedInput.split('')) {
    let last = 0;

    switch (char) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        stack[stack.length - 1].value += 1;
        break;
      case '(':
        stack.push({ value: 0, child: 0 });
        break;
      case ')':
        last = stack[stack.length - 1].value;
        stack[stack.length - 2].child = Math.max(
          stack[stack.length - 2].child,
          last
        );
        stack.pop();
        stack[stack.length - 1].value += stack[stack.length - 1].child;
        stack[stack.length - 1].child = 0;
        break;
      case '|':
        last = stack[stack.length - 1].value;
        stack[stack.length - 2].child = Math.max(
          stack[stack.length - 2].child,
          last
        );
        stack.pop();
        stack.push({ value: 0, child: 0 });
        break;
    }
  }

  return stack[0].value;
};

const input = getPuzzle(__dirname).input;
run(() => day20p1(input)); // 4214
