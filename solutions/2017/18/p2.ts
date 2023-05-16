import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Registers } from './day18.helper';

class Program {
  instructions: string[];
  registers: Registers;
  pc: number;
  queue: number[];
  awaiting: boolean;
  link?: Program;
  sendCount: number;

  constructor(instructions: string[], registers: Registers) {
    this.instructions = instructions;
    this.registers = registers;
    this.pc = 0;
    this.queue = [];
    this.awaiting = false;
    this.link = undefined;
    this.sendCount = 0;
  }

  establishLink(link: Program) {
    this.link = link;
  }

  send(value: number) {
    this.link?.queue.push(value);
  }

  step() {
    if (this.pc >= this.instructions.length) return;

    const [op, x, y] = this.instructions[this.pc].split(' ');

    switch (op) {
      case 'snd':
        this.send(this.registers.get(x));
        this.sendCount++;
        break;
      case 'set':
        this.registers.set(x, y);
        break;
      case 'add':
        this.registers.add(x, y);
        break;
      case 'mul':
        this.registers.mul(x, y);
        break;
      case 'mod':
        this.registers.mod(x, y);
        break;
      case 'rcv':
        if (this.queue.length) {
          this.awaiting = false;
          this.registers.set(x, this.queue.shift() as number);
        } else {
          this.awaiting = true;
          return;
        }
        break;
      case 'jgz':
        this.pc += this.registers.jgz(x, y);
        break;
    }

    this.pc++;
  }
}

export const day18p2 = (input: string) => {
  const instructions = input.split('\n');
  const program0 = new Program(instructions, new Registers({ p: 0 }));
  const program1 = new Program(instructions, new Registers({ p: 1 }));
  program0.establishLink(program1);
  program1.establishLink(program0);

  while (!program0.awaiting || !program1.awaiting) {
    program0.step();
    program1.step();
  }

  return program1.sendCount;
};

const input = getPuzzle(__dirname).input;
run(() => day18p2(input)); // 5969
