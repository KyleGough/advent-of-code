export const matchNumbers = (input: string): number[] => {
  return [...input.matchAll(/\d+/g)].map((i) => parseInt(i[0]));
};

export const matchDisjointNumber = (input: string): number => {
  return parseInt([...input.matchAll(/\d/g)].map((i) => i[0]).join(''));
};
