import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

interface State {
  number: string;
  symbol: boolean;
}

export const day03p1 = (input: string) => {
  const grid = input.split('\n').map((i) => `${i}.`.split(''));
  const width = grid[0].length;
  const height = grid.length;
  let state = resetState();
  let total = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = grid[y][x];

      if (/\d/.test(value)) {
        if (state.number === '' && x > 0) {
          // Check 3 cells to the left of the number.
          if (isSymbolVertical(grid, x - 1, y) || isSymbol(grid[y][x - 1])) {
            state.symbol = true;
          }
        }
        state.number += value;
        if (isSymbolVertical(grid, x, y)) {
          state.symbol = true;
        }
      } else if (value === '.') {
        // Non-symbol
        if (state.number !== '') {
          if (state.symbol || isSymbolVertical(grid, x, y)) {
            total += parseInt(state.number);
          }
          state = resetState();
        }
      } else if (state.number !== '') {
        // Symbol
        if (isSymbolVertical(grid, x, y)) {
          state.symbol = true;
        }
        total += parseInt(state.number);
        state = resetState();
      }
    }
  }

  return total;
};

const resetState = (): State => {
  return { number: '', symbol: false };
};

const isSymbolVertical = (grid: string[][], x: number, y: number): boolean => {
  return (
    (y - 1 >= 0 && isSymbol(grid[y - 1][x])) ||
    (y + 1 < grid.length && isSymbol(grid[y + 1][x]))
  );
};

const isSymbol = (input: string): boolean => {
  return input !== '.' && !/\d/.test(input);
};

const input = getPuzzle(__dirname).input;
run(() => day03p1(input)); // 554003
