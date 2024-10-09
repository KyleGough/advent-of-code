import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { Bracket, bracketMatch } from './day10.helper';

export const day10p1 = (input: string) => {
  const lines = input.split('\n');
  const scores = lines.map(getCorruptScore);
  return scores.reduce(sum, 0);
};

const bracketScore: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const getCorruptScore = (line: string): number => {
  const stack: Bracket[] = [];

  for (const char of line) {
    switch (char) {
      case '(':
      case '[':
      case '{':
      case '<':
        stack.push(char);
        break;
      default:
        const top = stack.pop() as Bracket;
        if (top !== bracketMatch[char as keyof typeof bracketMatch]) {
          return bracketScore[char];
        }
    }
  }

  return 0;
};

const input = getPuzzle(__dirname).input;
run(() => day10p1(input)); // 315693
