export const parseNumbers = (input: string): number[] => {
  return input.split(' ').map((i) => parseInt(i));
};

export const constructDiffs = (lastSequence: number[]): [number[], boolean] => {
  const nextSequence: number[] = [];
  let allZeros = true;
  for (let i = 1; i < lastSequence.length; i++) {
    const diff = lastSequence[i] - lastSequence[i - 1];
    if (diff !== 0) {
      allZeros = false;
    }
    nextSequence.push(diff);
  }

  return [nextSequence, allZeros];
};
