export const getWinMethodCount = (time: number, distance: number): number => {
  const discriminant = Math.pow(time, 2) - 4 * distance;
  const n1 = (time - Math.sqrt(discriminant)) / 2;
  const n2 = (time + Math.sqrt(discriminant)) / 2;

  const min = Math.min(n1, n2);
  const minCeil = Math.ceil(Number.isInteger(min) ? min + 1 : min);

  const max = Math.max(n1, n2);
  const maxFloor = Math.floor(Number.isInteger(max) ? max - 1 : max);

  return maxFloor - minCeil + 1;
};
