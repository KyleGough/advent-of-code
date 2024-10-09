import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Bracket, bracketMatch } from './day10.helper';

export const day10p2 = (input: string) => {
  const lines = input.split('\n');
  const scores = lines.map(getCompletionScore).filter(Boolean);
  return scores.sort((a, b) => a - b)[(scores.length - 1) / 2];
};

const bracketScore: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const getCompletionScore = (line: string): number => {
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
          return 0;
        }
    }
  }

  const completion = stack.reverse().map((char) => bracketMatch[char]);
  let score = 0;

  for (const bracket of completion) {
    score *= 5;
    score += bracketScore[bracket];
  }

  return score;
};

const input = getPuzzle(__dirname).input;
run(() => day10p2(input)); // 1870887234
