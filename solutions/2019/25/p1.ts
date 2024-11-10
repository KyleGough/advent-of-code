import readline from 'readline';
import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Intcode } from '../05/day05.helper';

/**
 * Interactive version of the text-based adventure. Solved manually.
 *
 * 1) Don't take the following items:
 * - Photons
 * - Molten Lava
 * - Escape Pod
 * - Electromagnet
 * - Infinite Loop
 *
 * 2) Pickup everything else and navigate to the security checkpoint.
 * 3) Find the combination of items with the correct weight by process of elimination.
 */
export const day25p1 = async (input: string) => {
  const nums = input.split(',').map(Number);
  const program = new Intcode(nums);

  while (!program.halt) {
    console.clear();
    const promptInput = (await prompt(awaitInput(program))) as string;
    const asciiInput = convertToAscii(`${promptInput}\n`);
    consumeInput(program, asciiInput);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question: string) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const awaitInput = (program: Intcode): string => {
  const outputBuffer: number[] = [];

  while (!program.halt) {
    const { opcode } = program.getInstruction();
    if (opcode === 3) break;
    const output = program.runStep([]);
    outputBuffer.push(...output);
  }

  const text = outputBuffer.map((c) => String.fromCharCode(c));
  return text.join('');
};

const consumeInput = (program: Intcode, input: number[]): string => {
  const outputBuffer: number[] = [];

  while (!program.halt && input.length) {
    const output = program.runStep(input);
    outputBuffer.push(...output);
  }

  const text = outputBuffer.map((c) => String.fromCharCode(c));
  return text.join('');
};

const convertToAscii = (input: string): number[] => {
  return input.split('').map((char) => char.charCodeAt(0));
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 8912902
