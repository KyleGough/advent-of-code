export const getCardMatches = (line: string): number => {
  const data = line.split(':')[1];
  const winStr = data.split('|')[0].matchAll(/\d+/g);
  const numStr = data.split('|')[1].matchAll(/\d+/g);
  const winningNumbers = [...winStr].map((i) => parseInt(i[0]));
  const numbers = [...numStr].map((i) => parseInt(i[0]));

  return (
    winningNumbers.length +
    numbers.length -
    new Set([...winningNumbers, ...numbers]).size
  );
};
