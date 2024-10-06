export const parseInstruction = (input: string): [string, number] => {
  const [direction, value] = input.split(' ');
  return [direction, parseInt(value)];
};
