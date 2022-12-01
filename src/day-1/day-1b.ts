import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputData = readFileSync(resolve(__dirname, 'input'), 'utf-8');
const items = inputData.split('\n\n');

const calorieList = items.map((item: string) =>
  item
    .split('\n')
    .map((carlorie) => Number(carlorie))
    .reduce((prev, curr) => prev + curr, 0)
);

const [c1, c2, c3] = calorieList.sort((a, b) => b - a).splice(0, 3);

const output = c1 + c2 + c3;

console.log(output);
