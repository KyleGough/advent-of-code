import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

interface PuzzleConfig<T> {
  example: T;
  input: T;
}

type PuzzleWithConfig<T> = Record<string, [string, T]>;

export const getPuzzle = (dir: string) => {
  const exampleTextPath = resolve(dir, 'example.txt');
  const inputTextPath = resolve(dir, 'input.txt');

  return {
    example: existsSync(exampleTextPath)
      ? readFileSync(exampleTextPath, 'utf-8').trim()
      : '',
    input: existsSync(inputTextPath)
      ? readFileSync(inputTextPath, 'utf-8').trim()
      : '',
  };
};

export const getPuzzleWithConfig = <T>(
  dir: string,
  customConfig: PuzzleConfig<T>
): PuzzleWithConfig<T> => {
  const puzzles = getPuzzle(dir);
  return {
    example: [puzzles.example, customConfig.example],
    input: [puzzles.input, customConfig.input],
  };
};
