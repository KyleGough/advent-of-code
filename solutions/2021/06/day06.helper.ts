import { sum } from '@utilities/reduce';

export const getInitialFish = (input: string): Record<number, number> => {
  const nums = input.split(',').map(Number);
  const fish: Record<number, number> = {};

  for (let i = 0; i <= 8; i++) {
    fish[i] = nums.filter((n) => n === i).length;
  }

  return fish;
};

export const getFishCount = (
  initialFish: Record<number, number>,
  dayCount: number
): number => {
  let currentFish: Record<number, number> = initialFish;
  let nextFish: Record<number, number> = {};

  for (let day = 0; day < dayCount; day++) {
    nextFish = {};

    for (let i = 0; i <= 8; i++) {
      nextFish[i] = currentFish[(i + 1) % 9];
    }

    nextFish[6] += currentFish[0];

    currentFish = nextFish;
  }

  return Object.values(currentFish).reduce(sum, 0);
};
