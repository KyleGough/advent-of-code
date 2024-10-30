export interface StepOutput {
  ip: number;
  output: number;
  halt: boolean;
  base: number;
}

export const intcodeComputer = (nums: number[], input: number[]): number => {
  let ip = 0;
  let output = 0;
  let base = 0;

  while (ip < nums.length) {
    const step = intcodeComputerStep(nums, input, ip, base);

    if (step.halt) {
      break;
    }

    output = step.output;
    ip = step.ip;
    base = step.base;
  }

  return output;
};

export const intcodeComputerStep = (
  nums: number[],
  input: number[],
  ip: number,
  base = 0
): StepOutput => {
  const getValue = (index: number, mode: string): number => {
    return nums[getIndex(index, mode)] ?? 0;
  };

  const getIndex = (index: number, mode: string): number => {
    if (mode === '0') {
      // Position mode
      return nums[index];
    } else if (mode === '1') {
      // Immediate mode
      return index;
    } else if (mode === '2') {
      // Relative mode
      return base + nums[index];
    } else {
      throw new Error('Invalid mode');
    }
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
        const output = getValue(ip + 1, c);
        ip += 2;
        return { ip, output, halt: false, base };
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
      case 9:
        // Adjust relative base
        base += getValue(ip + 1, c);
        ip += 2;
        break;
      case 99:
        // Halt
        return { ip, output: 0, halt: true, base };
      default:
        throw new Error(`Invalid opcode ${opcode}`);
    }
  }

  return { ip, output: 0, halt: false, base };
};
