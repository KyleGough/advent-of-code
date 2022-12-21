import { sum } from '@utilities/reduce';

const modulo = (n: number, m: number) => ((n % m) + m) % m;

const insertAt = <T>(arr: T[], index: number, value: T): T[] => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index),
];

export const mix = (
  sequence: number[],
  indexes: number[]
): [number[], number[]] => {
  const length = sequence.length;

  for (let i = 0; i < length; i++) {
    const idx = indexes.findIndex((value) => value === i);
    const shiftAmount = sequence[idx];
    let insertionIndex;

    // Modulo arithmetic to get insertion index.
    if (shiftAmount === 0) {
      continue;
    } else if (shiftAmount > 0) {
      insertionIndex = modulo(idx + shiftAmount, length - 1);
    } else {
      insertionIndex =
        modulo(modulo(idx + shiftAmount, length - 1) - 1, length - 1) + 1;
    }

    const slicedSequence = [
      ...sequence.slice(0, idx),
      ...sequence.slice(idx + 1),
    ];

    const slicedIndexes = [...indexes.slice(0, idx), ...indexes.slice(idx + 1)];

    sequence = insertAt(slicedSequence, insertionIndex, shiftAmount);
    indexes = insertAt(slicedIndexes, insertionIndex, i);
  }

  return [sequence, indexes];
};

export const getCoordinates = (sequence: number[]) => {
  const length = sequence.length;
  const zeroIndex = sequence.findIndex((value) => value === 0);

  const coords = [
    sequence[(zeroIndex + 1000) % length],
    sequence[(zeroIndex + 2000) % length],
    sequence[(zeroIndex + 3000) % length],
  ];

  return coords.reduce(sum);
};
