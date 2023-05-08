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

export const knotHash = (
  lengths: number[],
  pos: number,
  skipSize: number,
  listLength: number,
  rounds = 1
): number[] => {
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
