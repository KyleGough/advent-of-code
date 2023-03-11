export const isOpen = (x: number, y: number, favNum: number): boolean => {
  const num = x * (x + 3) + y * (1 + y) + 2 * x * y + favNum;
  const binary = num.toString(2).split('');
  const numOnes = binary.reduce(
    (prev, curr) => (curr === '1' ? prev + 1 : prev),
    0
  );
  return numOnes % 2 === 0;
};

export const hashCoord = (x: number, y: number): string => {
  return `${x},${y}`;
};
