import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { hasRequiredKeys } from './day04.helper';

export const day04p2 = (input: string) => {
  const passports = input.split('\n\n');
  return passports.filter(hasRequiredKeys).filter(isValidPassport).length;
};

const extractKeyValuePairs = (input: string): string[] =>
  input
    .split('\n')
    .map((i) => i.split(' '))
    .flat();

const isWithinNumberRange = (
  value: string,
  min: number,
  max: number
): boolean => {
  return parseInt(value) >= min && parseInt(value) <= max;
};

const validEyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const isValidPassport = (input: string): boolean => {
  const pairs = extractKeyValuePairs(input);

  for (const p of pairs) {
    const [key, value] = p.split(':');
    let valid = true;
    switch (key) {
      case 'byr':
        valid = isWithinNumberRange(value, 1920, 2002);
        break;
      case 'iyr':
        valid = isWithinNumberRange(value, 2010, 2020);
        break;
      case 'eyr':
        valid = isWithinNumberRange(value, 2020, 2030);
        break;
      case 'hgt':
        if (value.endsWith('in')) {
          valid = isWithinNumberRange(value.slice(0, value.length - 2), 59, 76);
        } else if (value.endsWith('cm')) {
          valid = isWithinNumberRange(
            value.slice(0, value.length - 2),
            150,
            193
          );
        } else {
          valid = false;
        }
        break;
      case 'hcl':
        valid = !!value.match(/^#[0-9a-f]{6}$/);
        break;
      case 'ecl':
        valid = validEyeColours.includes(value);
        break;
      case 'pid':
        valid = !!value.match(/^[0-9]{9}$/);
        break;
      case 'cid':
        break;
    }

    if (!valid) {
      return false;
    }
  }

  return true;
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 101
