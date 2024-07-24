export const getInvalidNum = (nums: number[], preamble: number): number => {
  for (let i = preamble; i < nums.length; i++) {
    const value = nums[i];
    const previousNums = nums.slice(i - preamble, i).filter((i) => i <= value);
    if (!isValidSum(nums[i], previousNums)) {
      return nums[i];
    }
  }

  return 0;
};

const isValidSum = (value: number, nums: number[]): boolean => {
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] > value) continue;

    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === value) {
        return true;
      }
    }
  }

  return false;
};
