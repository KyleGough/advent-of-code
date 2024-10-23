interface StepOutput {
  ip: number;
  output: number;
  halt: boolean;
}

export const intcodeComputer = (nums: number[], input: number[]): number => {
  let ip = 0;
  let output = 0;

  while (ip < nums.length) {
    const step = incodeComputerStep(nums, input, ip);

    if (step.halt) {
      break;
    }

    output = step.output;
    ip = step.ip;
  }

  return output;
};

export const incodeComputerStep = (
  nums: number[],
  input: number[],
  ip: number
): StepOutput => {
  const getValue = (index: number, mode: string): number => {
    return nums[getIndex(index, mode)];
  };

  const getIndex = (index: number, mode: string): number => {
    return mode === '0' ? nums[index] : index;
  };

  while (ip < nums.length) {
    const instruction = nums[ip].toString().padStart(5, '0');
    const opcode = parseInt(instruction.slice(3));
    const a = instruction.charAt(0);
    const b = instruction.charAt(1);
    const c = instruction.charAt(2);

    switch (opcode) {
      case 1:
        // Addition
        nums[getIndex(ip + 3, a)] = getValue(ip + 1, c) + getValue(ip + 2, b);
        ip += 4;
        break;
      case 2:
        // Multiplication
        nums[getIndex(ip + 3, a)] = getValue(ip + 1, c) * getValue(ip + 2, b);
        ip += 4;
        break;
      case 3:
        // Read
        nums[getIndex(ip + 1, c)] = input.shift() as number;
        ip += 2;
        break;
      case 4:
        // Output
        const output = nums[getIndex(ip + 1, c)];
        ip += 2;
        return { ip, output, halt: false };
      case 5:
        // Jump-if-true
        if (getValue(ip + 1, c) !== 0) {
          ip = nums[getIndex(ip + 2, b)];
        } else {
          ip += 3;
        }
        break;
      case 6:
        // Jump-if-false
        if (getValue(ip + 1, c) === 0) {
          ip = nums[getIndex(ip + 2, b)];
        } else {
          ip += 3;
        }
        break;
      case 7:
        // Less than
        if (getValue(ip + 1, c) < getValue(ip + 2, b)) {
          nums[getIndex(ip + 3, a)] = 1;
        } else {
          nums[getIndex(ip + 3, a)] = 0;
        }
        ip += 4;
        break;
      case 8:
        // Equals
        if (getValue(ip + 1, c) === getValue(ip + 2, b)) {
          nums[getIndex(ip + 3, a)] = 1;
        } else {
          nums[getIndex(ip + 3, a)] = 0;
        }
        ip += 4;
        break;
      default:
        // Halt
        return { ip, output: 0, halt: true };
    }
  }

  return { ip, output: 0, halt: false };
};
