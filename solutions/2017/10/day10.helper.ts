import { modulo } from '@utilities/modulo';

const knot = (
  list: number[],
  length: number,
  pos: number,
  listLength: number
): number[] => {
  if (pos + length >= listLength && length <= listLength && length > 1) {
    const section = [
      ...list.slice(pos),
      ...list.slice(0, length - listLength + pos),
    ].reverse();
    list = [
      ...section.slice(listLength - pos),
      ...list.slice(length - listLength + pos, pos),
      ...section.slice(0, listLength - pos),
    ];
  } else if (pos + length < listLength && length > 1) {
    list = [
      ...list.slice(0, pos),
      ...list.slice(pos, pos + length).reverse(),
      ...list.slice(pos + length),
    ];
  }

  return list;
};

export const knotHash = (lengths: number[], rounds = 1): number[] => {
  let pos = 0;
  let skipSize = 0;
  const listLength = 256;
  let list: number[] = [];

  // Initialise list.
  for (let i = 0; i < listLength; i++) {
    list.push(i);
  }

  for (let r = 0; r < rounds; r++) {
    for (let i = 0; i < lengths.length; i++) {
      const length = lengths[i];
      list = knot(list, length, pos, listLength);
      pos = modulo(pos + length + skipSize, listLength);
      skipSize++;
    }
  }

  return list;
};

export const denseHash = (lengths: number[], rounds = 64): string => {
  const sparseHash = knotHash(lengths, rounds);
  const denseHash = [];

  for (let i = 0; i < 16; i++) {
    const section = sparseHash.slice(i * 16, i * 16 + 16);
    const xorSection = section.reduce((prev, curr) => prev ^ curr);
    const hex = xorSection.toString(16).padStart(2, '0');
    denseHash.push(hex);
  }

  return denseHash.join('');
};
