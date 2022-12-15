import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day07p2 = (input: string) => {
  const instructions = input.split('\n');
  let signalMap: Record<string, string | number> = {};

  const findValue = (id: string): number => {
    const value = signalMap[id];
    let match;
    let output;

    if (id.match(/^\d+$/)) {
      output = parseInt(id);
      return output;
    } else if (typeof value === 'number') {
      output = value;
    } else if ((match = value.match(/^(.+) AND (.+)$/))) {
      output = findValue(match[1]) & findValue(match[2]);
    } else if ((match = value.match(/^(.+) OR (.+)$/))) {
      output = findValue(match[1]) | findValue(match[2]);
    } else if ((match = value.match(/^(.+) LSHIFT (.+)$/))) {
      output = findValue(match[1]) << parseInt(match[2]);
    } else if ((match = value.match(/^(.+) RSHIFT (.+)$/))) {
      output = findValue(match[1]) >> parseInt(match[2]);
    } else if ((match = value.match(/^NOT (.+)$/))) {
      output = ~findValue(match[1]);
    } else {
      output = findValue(value);
    }

    output &= 0xffff;
    signalMap[id] = output;
    return output & 0xffff;
  };

  for (let i = 0; i < instructions.length; i++) {
    const [command, signal] = instructions[i].split(' -> ');
    signalMap[signal] = command;
  }

  const valueA = findValue('a');

  signalMap = {};

  for (let i = 0; i < instructions.length; i++) {
    const [command, signal] = instructions[i].split(' -> ');
    signalMap[signal] = command;
  }
  signalMap['b'] = valueA;

  return findValue('a');
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 40149
