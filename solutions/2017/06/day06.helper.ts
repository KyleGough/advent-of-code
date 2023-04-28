import { modulo } from '@utilities/modulo';

interface RedistributionLoop {
  banks: number[];
  loopSize: number;
}

const banksToState = (arr: number[]): string => {
  return arr.map((i) => i.toString()).join(',');
};

const redistribute = (arr: number[]): number[] => {
  let max = 0;
  let maxIndex = 0;

  // Find the position of the max item.
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }

  arr[maxIndex] = 0;

  for (let i = 0; i < max; i++) {
    arr[modulo(maxIndex + 1 + i, arr.length)]++;
  }

  return arr;
};

export const executeLoop = (banks: number[]): RedistributionLoop => {
  const seenStates = new Set([banksToState(banks)]);
  let foundRepeat = false;

  while (!foundRepeat) {
    banks = redistribute(banks);
    const nextState = banksToState(banks);
    if (seenStates.has(nextState)) {
      foundRepeat = true;
    } else {
      seenStates.add(nextState);
    }
  }

  return { banks, loopSize: seenStates.size };
};
