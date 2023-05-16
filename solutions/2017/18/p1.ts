import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Registers } from './day18.helper';

export const day18p1 = (input: string) => {
  const instructions = input.split('\n');
  const registers = new Registers();
  let playedSound = false;
  let lastSoundPlayed = 0;
  let recover = 0;
  let pc = 0;

  while (pc < instructions.length && !playedSound) {
    const [op, x, y] = instructions[pc].split(' ');

    switch (op) {
      case 'snd':
        lastSoundPlayed = registers.get(x);
        break;
      case 'set':
        registers.set(x, y);
        break;
      case 'add':
        registers.add(x, y);
        break;
      case 'mul':
        registers.mul(x, y);
        break;
      case 'mod':
        registers.mod(x, y);
        break;
      case 'rcv':
        if (registers.get(x) > 0) {
          recover = lastSoundPlayed;
          playedSound = true;
        }
        break;
      case 'jgz':
        pc += registers.jgz(x, y);
        break;
    }

    pc++;
  }

  return recover;
};

const input = getPuzzle(__dirname).input;
run(() => day18p1(input)); // 1187
