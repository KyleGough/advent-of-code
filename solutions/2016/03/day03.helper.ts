export const trianglePossible = (lengths: number[]): boolean => {
  const [a, b, c] = lengths;
  return a + b > c && a + c > b && b + c > a;
};

export const parseLength = (line: string): number[] =>
  [...line.matchAll(/\d+/g)].map((i) => parseInt(i[0]));
