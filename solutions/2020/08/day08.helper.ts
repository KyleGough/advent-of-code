interface Instruction {
  opcode: string;
  operand: number;
}

export const parseInstruction = (input: string): Instruction => {
  const [opcode, operand] = input.split(' ');
  return { opcode, operand: parseInt(operand) };
};

export const simulate = (
  instructions: Instruction[]
): { acc: number; foundLoop: boolean } => {
  const visited = new Set<number>();
  let acc = 0;
  let pc = 0;
  let foundLoop = false;

  while (!foundLoop && pc < instructions.length) {
    if (visited.has(pc)) {
      foundLoop = true;
      continue;
    }

    visited.add(pc);

    const { opcode, operand } = instructions[pc];

    switch (opcode) {
      case 'nop':
        pc += 1;
        break;
      case 'acc':
        acc += operand;
        pc += 1;
        break;
      case 'jmp':
        pc += operand;
    }
  }

  return { acc, foundLoop };
};
