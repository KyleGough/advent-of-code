import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

interface Instruction {
  command: string;
  x: string;
  y: string;
}

const parseInstruction = (input: string): Instruction => {
  const match = input.match(/(?<command>\w+) (?<x>\w+) ?(?<y>-?\w+)?/)?.groups;

  if (!match) throw new Error('Unable to parse instruction');

  return { command: match.command, x: match.x, y: match.y ?? '' };
};

const arrayEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const optimiseMultiply = (
  instructions: Instruction[],
  register: Record<string, number>,
  registerNames: string[]
): boolean => {
  /*  Checking for next 6 instructions of the following form:
        cpy b c
        inc a
        dec c
        jnz c -2
        dec d
        jnz d -5
      This will update the registers as follows:
        a += b * d
        c = 0
        d = 0
  */

  const commandMatch = arrayEqual(
    instructions.map((i) => i.command),
    ['cpy', 'inc', 'dec', 'jnz', 'dec', 'jnz']
  );

  if (!commandMatch) return false;

  const operandMatch =
    instructions[0].y === instructions[2].x &&
    instructions[2].x === instructions[3].x &&
    instructions[3].y === '-2' &&
    instructions[4].x === instructions[5].x &&
    instructions[5].y === '-5';

  if (!operandMatch) return false;

  // Add multiplication result to target register.
  const targetRegister = instructions[1].x;
  const leftOperand = instructions[0].x;
  const multLeft = registerNames.includes(leftOperand)
    ? register[leftOperand]
    : parseInt(leftOperand);
  const rightOperand = instructions[4].x;
  const multRight = registerNames.includes(rightOperand)
    ? register[rightOperand]
    : parseInt(rightOperand);
  register[targetRegister] += multLeft * multRight;

  // Reset helper registers to 0.
  register[instructions[3].x] = 0;
  register[instructions[5].x] = 0;

  return true;
};

const runAssembunny = (
  instructions: Instruction[],
  register: Record<string, number>
): boolean => {
  const registerNames = Object.keys(register);
  let pc = 0;
  const outputStream: number[] = [];

  while (pc < instructions.length) {
    const { command, x, y } = instructions[pc];

    switch (command) {
      case 'cpy':
        if (
          optimiseMultiply(
            instructions.slice(pc, pc + 6),
            register,
            registerNames
          )
        ) {
          pc += 5;
        } else if (registerNames.includes(y)) {
          register[y] = registerNames.includes(x) ? register[x] : parseInt(x);
        }
        pc++;
        break;
      case 'inc':
        register[x]++;
        pc++;
        break;
      case 'dec':
        register[x]--;
        pc++;
        break;
      case 'jnz':
        const isRegister = registerNames.includes(x);
        if ((isRegister && register[x] !== 0) || (!isRegister && x !== '0')) {
          pc += parseInt(y);
        } else {
          pc++;
        }
        break;
      case 'out':
        const output = registerNames.includes(x) ? register[x] : parseInt(x);
        const startsWith1 = outputStream.length === 0 && output === 1;
        const sameOutput =
          outputStream.length > 0 &&
          outputStream[outputStream.length - 1] === output;

        if (startsWith1 || sameOutput) return false;

        outputStream.push(output);
        pc++;
        break;
    }

    if (outputStream.length >= 25) {
      return true;
    }
  }

  return false;
};

export const day25p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);

  for (let i = 1; i < 1_000_000; i++) {
    if (runAssembunny(instructions, { a: i, b: 0, c: 0, d: 0 })) {
      return i;
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 182
