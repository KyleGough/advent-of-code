import { readFileSync } from 'fs';
import { resolve } from 'path';

export const getPuzzleInput = (dir: string) => {
  return {
    example: readFileSync(resolve(dir, 'example.txt'), 'utf-8'),
    input: readFileSync(resolve(dir, 'input.txt'), 'utf-8'),
  };
};
