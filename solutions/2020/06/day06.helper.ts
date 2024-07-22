export const uniqueLetters = (input: string): Set<string> => {
  const s = new Set(input.trim().split(''));
  s.delete('\n');
  return s;
};
