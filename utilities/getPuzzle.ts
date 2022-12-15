import { readFileSync } from 'fs';
import { resolve } from 'path';

interface CustomData<T> {
  example: T;
  input: T;
}

type PuzzleWithCustomInput<T> = Record<string, [string, T]>;

export const getPuzzle = (dir: string) => ({
  example: readFileSync(resolve(dir, 'example.txt'), 'utf-8').trim(),
  input: readFileSync(resolve(dir, 'input.txt'), 'utf-8').trim(),
});

export const getPuzzleWithCustomInput = <T>(
  dir: string,
  customData: CustomData<T>
): PuzzleWithCustomInput<T> => {
  const puzzles = getPuzzle(dir);
  return {
    example: [puzzles.example, customData.example],
    input: [puzzles.input, customData.input],
  };
};
