export const trianglePossible = (lengths: number[]): boolean => {
  const [a, b, c] = lengths;
  return a + b > c && a + c > b && b + c > a;
};
