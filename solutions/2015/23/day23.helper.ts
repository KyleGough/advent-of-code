export const turingLock = (
  instructions: string[],
  register: Record<string, number>
): number => {
  let pc = 0;

  while (pc >= 0 && pc < instructions.length) {
    const instruction = instructions[pc].split(' ');

    switch (instruction[0]) {
      case 'hlf':
        register[instruction[1]] /= 2;
        pc++;
        break;
      case 'tpl':
        register[instruction[1]] *= 3;
        pc++;
        break;
      case 'inc':
        register[instruction[1]]++;
        pc++;
        break;
      case 'jmp':
        const offset = parseInt(instruction[1]);
        pc += offset;
        break;
      case 'jie':
        if (register[instruction[1].charAt(0)] % 2 === 0) {
          const offset = parseInt(instruction[2]);
          pc += offset;
        } else {
          pc++;
        }
        break;
      default:
        if (register[instruction[1].charAt(0)] === 1) {
          const offset = parseInt(instruction[2]);
          pc += offset;
        } else {
          pc++;
        }
        break;
    }
  }

  return register['b'];
};
