import { sum } from '@utilities/reduce';

export const parsePlayer = (input: string): number[] => {
  return input.split('\n').slice(1).map(Number);
};

export const getWinningScore = (winner: number[]): number => {
  const scoreValues = winner.reverse().map((card, i) => card * (i + 1));
  return scoreValues.reduce(sum, 0);
};
