import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

const defaultRegisters = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
};

class Register {
  registers: Record<string, number>;
  registerNames: Set<string>;
  mulCount: number;

  constructor(registers = {}) {
    this.registers = { ...defaultRegisters, ...registers };
    this.registerNames = new Set(Object.keys(this.registers));
    this.mulCount = 0;
  }

  get(id: string): number {
    if (this.registerNames.has(id)) {
      return this.registers[id];
    } else {
      return parseInt(id);
    }
  }

  set(id: string, value: string) {
    this.registers[id] = this.get(value);
    this.registerNames.add(id);
  }

  sub(id: string, value: string) {
    this.registers[id] -= this.get(value);
  }

  mul(id: string, value: string) {
    this.registers[id] *= this.get(value);
    this.mulCount++;
  }
}

const execute = (instructions: string[], registers: Register): Register => {
  let pc = 0;

  while (pc < instructions.length) {
    const [op, x, y] = instructions[pc].split(' ');

    switch (op) {
      case 'set':
        registers.set(x, y);
        break;
      case 'sub':
        registers.sub(x, y);
        break;
      case 'mul':
        registers.mul(x, y);
        break;
      case 'jnz':
        if (registers.get(x) !== 0) {
          pc += registers.get(y) - 1;
        }
        break;
    }

    pc++;
  }

  return registers;
};

export const day23p1 = (input: string) => {
  const instructions = input.split('\n');
  const registers = new Register();
  return execute(instructions, registers).mulCount;
};

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 3969
