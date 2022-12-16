// Heap's method to generate all permutations of an array.
export const permutations = <T>(arr: T[]): T[][] => {
  const length = arr.length;
  const permutations = [arr.slice()];
  const c = new Array(length).fill(0);
  let i = 1;

  while (i < length) {
    if (c[i] < i) {
      const swapIndex = i % 2 && c[i];
      // Swap locations at index i and k.
      const tmp = arr[i];
      arr[i] = arr[swapIndex];
      arr[swapIndex] = tmp;
      c[i]++;
      i = 1;
      permutations.push(arr.slice());
    } else {
      c[i] = 0;
      i++;
    }
  }

  return permutations;
};
