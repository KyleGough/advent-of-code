import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction, simulate } from './day08.helper';

export const day08p2 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  let acc = 0;
  let foundLoop: boolean;

  for (let i = 0; i < instructions.length; i++) {
    const { opcode, operand } = instructions[i];

    if (opcode === 'acc') continue;

    const updatedInstructions = [
      ...instructions.slice(0, i),
      { opcode: opcode === 'nop' ? 'jmp' : 'nop', operand },
      ...instructions.slice(i + 1),
    ];

    ({ acc, foundLoop } = simulate(updatedInstructions));
    if (!foundLoop) {
      break;
    }
  }

  return acc;
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // 515
