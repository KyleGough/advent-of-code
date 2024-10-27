import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

type PuzzleConfig<T> = Record<string, T>;
type PuzzleWithConfig<T> = Record<string, [string, T]>;

export const getPuzzle = (dir: string): Record<string, string> => {
  const exampleTextPath = resolve(dir, 'example.txt');
  const exampleTextPath2 = resolve(dir, 'example2.txt');
  const exampleTextPath3 = resolve(dir, 'example3.txt');
  const inputTextPath = resolve(dir, 'input.txt');

  return {
    example: getFile(exampleTextPath),
    example2: getFile(exampleTextPath2),
    example3: getFile(exampleTextPath3),
    input: getFile(inputTextPath),
  };
};

const getFile = (file: string): string => {
  return existsSync(file) ? readFileSync(file, 'utf-8') : '';
};

export const getPuzzleWithConfig = <T>(
  dir: string,
  customConfig: PuzzleConfig<T>
): PuzzleWithConfig<T> => {
  const puzzles = getPuzzle(dir);
  return {
    example: [puzzles.example, customConfig.example],
    example2: [puzzles.example2, customConfig.example2],
    input: [puzzles.input, customConfig.input],
  };
};
