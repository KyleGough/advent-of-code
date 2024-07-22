const getRow = (input: string): number => {
  const chars = input.slice(0, 7).split('');
  const binary = chars.map((i) => (i === 'F' ? '0' : '1'));
  return parseInt(binary.join(''), 2);
};

const getColumn = (input: string): number => {
  const chars = input.slice(7).split('');
  const binary = chars.map((i) => (i === 'L' ? '0' : '1'));
  return parseInt(binary.join(''), 2);
};

export const getSeatId = (input: string): number => {
  return getRow(input) * 8 + getColumn(input);
};
