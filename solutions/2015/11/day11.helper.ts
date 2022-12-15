export const findNextPassword = (input: string): string => {
  let foundPassword = false;
  let currentPassword = initialPassword(input);

  while (!foundPassword) {
    currentPassword = nextPassword(currentPassword);
    if (
      countPairs(currentPassword) >= 2 &&
      containsStraight(currentPassword) &&
      !containsIllegalChars(currentPassword)
    ) {
      foundPassword = true;
    }
  }

  return convertArrayToPassword(currentPassword);
};

const initialPassword = (input: string): number[] => {
  const password = convertPasswordToArray(input);

  for (let i = 0; i < password.length; i++) {
    if (password[i] === 8 || password[i] === 11 || password[i] === 14) {
      password[i]++;
      for (let j = i + 1; j < password.length; j++) {
        password[j] = 0;
      }
    }
  }

  return password;
};

const nextPassword = (password: number[]): number[] => {
  for (let i = 7; i >= 0; i--) {
    password[i]++;
    password[i] = password[i] % 26;
    if (password[i] === 8 || password[i] === 11 || password[i] === 14) {
      password[i]++;
    }
    if (password[i] !== 0) {
      break;
    }
  }

  return password;
};

const convertPasswordToArray = (password: string): number[] =>
  password.split('').map((i) => i.charCodeAt(0) - 97);

const convertArrayToPassword = (arr: number[]): string =>
  String.fromCharCode(...arr.map((i) => i + 97));

const containsStraight = (input: number[]): boolean => {
  for (let i = 0; i < input.length - 2; i++) {
    if (input[i + 2] === input[i + 1] + 1 && input[i + 1] === input[i] + 1) {
      return true;
    }
  }
  return false;
};

const containsIllegalChars = (input: number[]): boolean => {
  for (let i = 0; i < input.length; i++) {
    if ([8, 11, 14].includes(input[i])) {
      return true;
    }
  }
  return false;
};

const countPairs = (input: number[]): number => {
  let pairs = 0;

  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] === input[i + 1]) {
      pairs++;
      i++;
    }
  }

  return pairs;
};
