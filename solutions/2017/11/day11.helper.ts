export interface Vector {
  q: number;
  r: number;
}

export const movePosition = (instruction: string, vec: Vector): Vector => {
  switch (instruction) {
    case 'n':
      return { ...vec, r: vec.r - 1 };
    case 'nw':
      return { ...vec, q: vec.q - 1 };
    case 'ne':
      return { q: vec.q + 1, r: vec.r - 1 };
    case 's':
      return { ...vec, r: vec.r + 1 };
    case 'sw':
      return { q: vec.q - 1, r: vec.r + 1 };
    case 'se':
      return { ...vec, q: vec.q + 1 };
    default:
      return vec;
  }
};

export const distanceFromOrigin = (vec: Vector): number => {
  const s = -vec.q - vec.r;
  return (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(s)) / 2;
};
