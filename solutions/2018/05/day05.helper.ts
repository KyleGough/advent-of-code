export const getReducedPolymerLength = (input: string): number => {
  let nextPolymer: string[] = input.split('');
  let currentPolymer: string[];

  do {
    currentPolymer = nextPolymer;
    nextPolymer = reactPolymer(currentPolymer);
  } while (nextPolymer.length !== currentPolymer.length);

  return nextPolymer.length;
};

const reactPolymer = (input: string[]): string[] => {
  const polymer: string[] = [];
  let i = 0;

  while (i < input.length - 1) {
    const first = input[i];
    const second = input[i + 1];
    if (hasReaction(first, second)) {
      i += 2;
    } else {
      polymer.push(first);
      i += 1;
    }
  }

  // Add the last character if no last match.
  if (i === input.length - 1) {
    polymer.push(input[i]);
  }

  return polymer;
};

const hasReaction = (charA: string, charB: string): boolean => {
  const lettersMatch = charA.toUpperCase() === charB.toUpperCase();
  const isLower = hasLowerCase(charA, charB);
  const isUpper = hasUpperCase(charA, charB);
  return lettersMatch && isLower && isUpper;
};

const hasLowerCase = (charA: string, charB: string): boolean => {
  return charA.toLowerCase() === charA || charB.toLowerCase() === charB;
};

const hasUpperCase = (charA: string, charB: string): boolean => {
  return charA.toUpperCase() === charA || charB.toUpperCase() === charB;
};
