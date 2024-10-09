export const getCounts = (nums: number[]): Record<number, number> => {
  const counts: Record<number, number> = {};

  for (const num of nums) {
    if (!counts[num]) {
      counts[num] = 0;
    }
    counts[num] += 1;
  }

  return counts;
};
