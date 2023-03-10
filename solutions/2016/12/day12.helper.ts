interface Instruction {
  command: string;
  x: string;
  y: string;
}

export const parseInstruction = (input: string): Instruction => {
  const match = input.match(/(?<command>\w+) (?<x>\w+) ?(?<y>-?\w+)?/)?.groups;

  if (!match) throw new Error('Unable to parse instruction');

  return { command: match.command, x: match.x, y: match.y ?? '' };
};

export const runAssembunny = (
  instructions: Instruction[],
  register: Record<string, number>
): Record<string, number> => {
  const registerNames = Object.keys(register);
  let pc = 0;

  while (pc < instructions.length) {
    const { command, x, y } = instructions[pc];

    switch (command) {
      case 'cpy':
        register[y] = registerNames.includes(x) ? register[x] : parseInt(x);
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
    }
  }

  return register;
};
