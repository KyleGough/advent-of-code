export const parseRow = (input: string): number[] =>
  input.split('\t').map((i) => parseInt(i));
