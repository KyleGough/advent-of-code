import { getPuzzle } from '@utilities/getPuzzle';

export const day05p1 = (input: string) => {
  return input
    .split('\n')
    .map((str) => {
      str.includes('ab');

      const containsDoubleLetter = /([a-z])\1/.test(str);

      const vowelCount = str
        .split('')
        .filter((i) => 'aeiou'.includes(i)).length;

      const containsBlacklist = /ab|cd|pq|xy/.test(str);

      return vowelCount >= 3 && containsDoubleLetter && !containsBlacklist;
    })
    .reduce((prev, curr) => (curr ? prev + 1 : prev), 0);
};

const input = getPuzzle(__dirname).input;
console.log(day05p1(input)); // 238
