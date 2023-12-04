import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

interface State {
  number: string;
  symbol: boolean;
  symbolList: string[];
}

export const day01p2 = (input: string) => {
  const grid = input.split('\n').map((i) => `${i}.`.split(''));
  const width = grid[0].length;
  const height = grid.length;
  let state = resetState();
  const map: Record<string, number[]> = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = grid[y][x];

      if (/\d/.test(value)) {
        if (state.number === '' && x > 0) {
          // Check 3 cells to the left of the number.
          isSymbolVertical(state, grid, x - 1, y);
          isSymbol(state, grid, x - 1, y);
        }
        state.number += value;
        isSymbolVertical(state, grid, x, y);
      } else if (state.number !== '') {
        isSymbolVertical(state, grid, x, y);
        isSymbol(state, grid, x, y);
        addSymbolMappings(map, state);
        state = resetState();
      }
    }
  }

  return getTotalGearRatio(map);
};

const resetState = (): State => {
  return { number: '', symbol: false, symbolList: [] };
};

const isSymbolVertical = (
  state: State,
  grid: string[][],
  x: number,
  y: number
) => {
  if (y - 1 >= 0) {
    isSymbol(state, grid, x, y - 1);
  }
  if (y + 1 < grid.length) {
    isSymbol(state, grid, x, y + 1);
  }
};

const isSymbol = (state: State, grid: string[][], x: number, y: number) => {
  if (grid[y][x] === '*') {
    state.symbol = true;
    state.symbolList.push(`${y},${x}`);
  }
};

const addSymbolMappings = (map: Record<string, number[]>, state: State) => {
  for (let i = 0; i < state.symbolList.length; i++) {
    if (map[state.symbolList[i]]) {
      map[state.symbolList[i]].push(parseInt(state.number));
    } else {
      map[state.symbolList[i]] = [parseInt(state.number)];
    }
  }
};

const getTotalGearRatio = (map: Record<string, number[]>): number => {
  let total = 0;

  for (const ratios of Object.values(map)) {
    if (ratios.length === 2) {
      total += ratios[0] * ratios[1];
    }
  }

  return total;
};

const input = getPuzzle(__dirname).input;
run(() => day01p2(input)); // 87263515
