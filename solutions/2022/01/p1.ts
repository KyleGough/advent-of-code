import { readFileSync } from 'fs';
import { resolve } from 'path';

export const day01p1 = (input: string) => {
  const items = input.split('\n\n');

  const calorieList = items.map((item: string) =>
    item
      .split('\n')
      .map((carlorie) => Number(carlorie))
      .reduce((prev, curr) => prev + curr, 0)
  );

  return calorieList.sort((a, b) => b - a)[0];
};

const input = readFileSync(resolve(__dirname, 'input'), 'utf-8');
console.log(day01p1(input)); // 70698
