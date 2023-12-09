export interface Claim {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const parseClaim = (input: string): Claim => {
  const groups = input.match(
    /^#(?<id>\d+) @ (?<x>\d+),(?<y>\d+): (?<width>\d+)x(?<height>\d+)/
  )?.groups;

  if (!groups) {
    throw new Error('Unable to parse claim');
  }

  return {
    id: parseInt(groups.id),
    x: parseInt(groups.x),
    y: parseInt(groups.y),
    width: parseInt(groups.width),
    height: parseInt(groups.height),
  };
};
