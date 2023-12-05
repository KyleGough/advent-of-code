export const getSeeds = (input: string): number[] => {
  return [...input.matchAll(/\d+/g)].map((i) => parseInt(i[0]));
};

export const parseTriplet = (triplet: string): number[] => {
  return [...triplet.matchAll(/\d+/g)].map((i) => parseInt(i[0]));
};
