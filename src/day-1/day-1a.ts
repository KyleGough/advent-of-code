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

const output = calorieList.sort((a, b) => b - a)[0];

console.log(output);
