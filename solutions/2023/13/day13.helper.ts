import { isArrayEqual, transpose } from '@utilities/array';

export const getAllReflections = (patternString: string): number[][] => {
  const pattern = patternString.split('\n').map((i) => i.split(''));
  const transposed = transpose(pattern);
  const vReflections = getReflections(pattern);
  const hReflections = getReflections(transposed);
  return [vReflections, hReflections];
};

const getReflections = (pattern: string[][]) => {
  const height = pattern.length;
  const validReflections = [];

  for (let i = 1; i < height; i++) {
    const firstHalf = pattern.slice(0, i).reverse();
    const secondHalf = pattern.slice(i);

    if (isReflection(firstHalf, secondHalf)) {
      validReflections.push(i);
    }
  }

  return validReflections;
};

const isReflection = (first: string[][], second: string[][]): boolean => {
  const minLength = Math.min(first.length, second.length);

  for (let i = 0; i < minLength; i++) {
    if (!isArrayEqual(first[i], second[i])) {
      return false;
    }
  }

  return true;
};
