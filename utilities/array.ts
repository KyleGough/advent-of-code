export const isArrayEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export const transpose = <T>(arr: T[][]): T[][] => {
  const width = arr[0].length;
  const transposed = [];

  for (let i = 0; i < width; i++) {
    transposed.push(arr.map((row) => row[i]));
  }

  return transposed;
};

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((value) => arr2.includes(value));
};
