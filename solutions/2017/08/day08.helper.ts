interface Instruction {
  register: string;
  command: string;
  value: number;
  condition: Condition;
}

interface Condition {
  register: string;
  comparison: string;
  value: number;
}

export const parseInstruction = (input: string): Instruction => {
  const values = input.split(' ');

  return {
    register: values[0],
    command: values[1],
    value: parseInt(values[2]),
    condition: {
      register: values[4],
      comparison: values[5],
      value: parseInt(values[6]),
    },
  };
};

const checkCondition = (
  registers: Record<string, number>,
  condition: Condition
): boolean => {
  const registerValue = registers[condition.register] ?? 0;

  switch (condition.comparison) {
    case '==':
      return registerValue == condition.value;
    case '>':
      return registerValue > condition.value;
    case '>=':
      return registerValue >= condition.value;
    case '<':
      return registerValue < condition.value;
    case '<=':
      return registerValue <= condition.value;
    default:
      return registerValue != condition.value;
  }
};

export const executeInstruction = (
  registers: Record<string, number>,
  instruction: Instruction
) => {
  const condition = checkCondition(registers, instruction.condition);
  const { register, command, value } = instruction;
  if (condition) {
    const incValue = command === 'inc' ? value : -value;
    if (!registers[register]) {
      registers[register] = 0;
    }
    registers[register] += incValue;
  }
};
