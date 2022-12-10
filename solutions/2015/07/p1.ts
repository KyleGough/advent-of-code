import { getPuzzle } from '@utilities/getPuzzle';

export const day07p1 = (input: string) => {
  const instructions = input.split('\n');

  for (let i = 0; i < instructions.length; i++) {
    console.log(instructions[i]);
    const [command, id] = instructions[i].split(' -> ');
    console.log(command);
  }

  return '';
};

const input = getPuzzle(__dirname).example;
console.log(day07p1(input));
