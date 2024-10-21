export const gravityAssistProgram = (nums: number[]): number => {
  for (let i = 0; i < nums.length; i += 4) {
    const opcode = nums[i];

    if (opcode === 1) {
      nums[nums[i + 3]] = nums[nums[i + 1]] + nums[nums[i + 2]];
    } else if (opcode === 2) {
      nums[nums[i + 3]] = nums[nums[i + 1]] * nums[nums[i + 2]];
    } else if (opcode === 99) {
      break;
    }
  }

  return nums[0];
};
