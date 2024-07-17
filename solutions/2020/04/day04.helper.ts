const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const extractKeys = (input: string): string[] =>
  input
    .split('\n')
    .map((i) => i.split(' '))
    .flat()
    .map((i) => i.split(':')[0]);

export const hasRequiredKeys = (input: string): boolean => {
  const keys = extractKeys(input);
  for (const k of requiredKeys) {
    if (!keys.includes(k)) {
      return false;
    }
  }

  return true;
};
