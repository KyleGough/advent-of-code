export const matchNumbers = (input: string): number[] => {
  return [...input.matchAll(/-?\d+/g)].map((i) => parseInt(i[0]));
};

export const matchDisjointNumber = (input: string): number => {
  return parseInt([...input.matchAll(/\d/g)].map((i) => i[0]).join(''));
};

export const countChars = (input: string): Record<string, number> => {
  const counts: Record<string, number> = {};

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (counts[char]) {
      counts[char]++;
    } else {
      counts[char] = 1;
    }
  }

  return counts;
};
