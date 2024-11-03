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
    let programOutput = 0;

    while (this.ip < this.program.length) {
      const stepOutput = this.awaitOutput(input);

      if (this.halt) {
        break;
      }

      programOutput = stepOutput;
    }

    return programOutput;
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
