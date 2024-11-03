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

  getInstruction() {
    const instruction = this.program[this.ip].toString().padStart(5, '0');
    const opcode = parseInt(instruction.slice(3));
    const a = instruction.charAt(0);
    const b = instruction.charAt(1);
    const c = instruction.charAt(2);
    return { opcode, a, b, c };
  }

  getValue(index: number, mode: string): number {
    return this.program[this.getIndex(index, mode)] ?? 0;
  }

  getIndex(index: number, mode: string): number {
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
  }

  runStep(input: number[]): number[] {
    const { opcode, a, b, c } = this.getInstruction();

    switch (opcode) {
      case 1:
        // Addition
        this.program[this.getIndex(this.ip + 3, a)] =
          this.getValue(this.ip + 1, c) + this.getValue(this.ip + 2, b);
        this.ip += 4;
        break;
      case 2:
        // Multiplication
        this.program[this.getIndex(this.ip + 3, a)] =
          this.getValue(this.ip + 1, c) * this.getValue(this.ip + 2, b);
        this.ip += 4;
        break;
      case 3:
        // Read
        this.program[this.getIndex(this.ip + 1, c)] = input.shift() as number;
        this.ip += 2;
        break;
      case 4:
        // Output
        const output = this.getValue(this.ip + 1, c);
        this.ip += 2;
        return [output];
      case 5:
        // Jump-if-true
        if (this.getValue(this.ip + 1, c) !== 0) {
          this.ip = this.program[this.getIndex(this.ip + 2, b)];
        } else {
          this.ip += 3;
        }
        break;
      case 6:
        // Jump-if-false
        if (this.getValue(this.ip + 1, c) === 0) {
          this.ip = this.program[this.getIndex(this.ip + 2, b)];
        } else {
          this.ip += 3;
        }
        break;
      case 7:
        // Less than
        if (this.getValue(this.ip + 1, c) < this.getValue(this.ip + 2, b)) {
          this.program[this.getIndex(this.ip + 3, a)] = 1;
        } else {
          this.program[this.getIndex(this.ip + 3, a)] = 0;
        }
        this.ip += 4;
        break;
      case 8:
        // Equals
        if (this.getValue(this.ip + 1, c) === this.getValue(this.ip + 2, b)) {
          this.program[this.getIndex(this.ip + 3, a)] = 1;
        } else {
          this.program[this.getIndex(this.ip + 3, a)] = 0;
        }
        this.ip += 4;
        break;
      case 9:
        // Adjust relative base
        this.base += this.getValue(this.ip + 1, c);
        this.ip += 2;
        break;
      case 99:
        // Halt
        this.halt = true;
        return [0];
      default:
        throw new Error(`Invalid opcode ${opcode}`);
    }

    return [];
  }

  awaitOutput(input: number[]): number {
    while (this.ip < this.program.length) {
      const output = this.runStep(input);
      if (output.length) {
        return output[0];
      }
    }

    return 0;
  }
}
