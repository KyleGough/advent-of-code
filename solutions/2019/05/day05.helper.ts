export interface StepOutput {
  ip: number;
  output: number;
  halt: boolean;
  base: number;
}

export class Intcode {
  program: number[];
  ip: number;
  base: number;
  halt: boolean;

  constructor(program: number[]) {
    this.program = program;
    this.ip = 0;
    this.base = 0;
    this.halt = false;
  }

  runProgram(input: number[]): number {
    let output = 0;

    while (this.ip < this.program.length) {
      const step = intcodeComputerStep(this.program, input, this.ip, this.base);

      if (step.halt) {
        break;
      }

      output = step.output;
      this.ip = step.ip;
      this.base = step.base;
    }

    return output;
  }

  awaitOutput = (input: number[]): number => {
    const getValue = (index: number, mode: string): number => {
      return this.program[getIndex(index, mode)] ?? 0;
    };

    const getIndex = (index: number, mode: string): number => {
      if (mode === '0') {
        // Position mode
        return this.program[index];
      } else if (mode === '1') {
        // Immediate mode
        return index;
      } else if (mode === '2') {
        // Relative mode
        return this.base + this.program[index];
      } else {
        throw new Error('Invalid mode');
      }
    };

    while (this.ip < this.program.length) {
      const instruction = this.program[this.ip].toString().padStart(5, '0');
      const opcode = parseInt(instruction.slice(3));
      const a = instruction.charAt(0);
      const b = instruction.charAt(1);
      const c = instruction.charAt(2);

      switch (opcode) {
        case 1:
          // Addition
          this.program[getIndex(this.ip + 3, a)] =
            getValue(this.ip + 1, c) + getValue(this.ip + 2, b);
          this.ip += 4;
          break;
        case 2:
          // Multiplication
          this.program[getIndex(this.ip + 3, a)] =
            getValue(this.ip + 1, c) * getValue(this.ip + 2, b);
          this.ip += 4;
          break;
        case 3:
          // Read
          this.program[getIndex(this.ip + 1, c)] = input.shift() as number;
          this.ip += 2;
          break;
        case 4:
          // Output
          const output = getValue(this.ip + 1, c);
          this.ip += 2;
          return output;
        case 5:
          // Jump-if-true
          if (getValue(this.ip + 1, c) !== 0) {
            this.ip = this.program[getIndex(this.ip + 2, b)];
          } else {
            this.ip += 3;
          }
          break;
        case 6:
          // Jump-if-false
          if (getValue(this.ip + 1, c) === 0) {
            this.ip = this.program[getIndex(this.ip + 2, b)];
          } else {
            this.ip += 3;
          }
          break;
        case 7:
          // Less than
          if (getValue(this.ip + 1, c) < getValue(this.ip + 2, b)) {
            this.program[getIndex(this.ip + 3, a)] = 1;
          } else {
            this.program[getIndex(this.ip + 3, a)] = 0;
          }
          this.ip += 4;
          break;
        case 8:
          // Equals
          if (getValue(this.ip + 1, c) === getValue(this.ip + 2, b)) {
            this.program[getIndex(this.ip + 3, a)] = 1;
          } else {
            this.program[getIndex(this.ip + 3, a)] = 0;
          }
          this.ip += 4;
          break;
        case 9:
          // Adjust relative base
          this.base += getValue(this.ip + 1, c);
          this.ip += 2;
          break;
        case 99:
          // Halt
          this.halt = true;
          return 0;
        default:
          throw new Error(`Invalid opcode ${opcode}`);
      }
    }

    return 0;
  };
}

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
