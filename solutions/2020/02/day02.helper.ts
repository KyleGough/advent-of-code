export interface Policy {
  min: number;
  max: number;
  letter: string;
  password: string;
}

export const parsePolicy = (input: string): Policy => {
  const [range, letter, password] = input.split(' ');

  return {
    min: parseInt(range.split('-')[0]),
    max: parseInt(range.split('-')[1]),
    letter: letter[0],
    password,
  };
};
