export const getOrderedAdapterSequence = (input: string): number[] => {
  const nums = input
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);

  const highestRating = nums[nums.length - 1] + 3;

  nums.unshift(0);
  nums.push(highestRating);

  return nums;
};
