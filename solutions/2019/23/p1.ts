import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { NetworkedComputer } from './day23.helper';

export const day23p1 = (input: string) => {
  const nums = input.split(',').map(Number);
  const networkSize = 50;
  const network: NetworkedComputer[] = [];
  let terminate = false;
  let output = 0;

  const sendSignal = (destination: number, x: number, y: number) => {
    if (destination === 255) {
      output = y;
      terminate = true;
      return;
    }

    network[destination].inputBuffer.push(x, y);
  };

  // Initialise network.
  for (let i = 0; i < networkSize; i++) {
    network.push(new NetworkedComputer(i, [...nums], network, sendSignal));
  }

  // Perform a single step in each computer.
  while (!terminate) {
    network.forEach((computer) => computer.processStep());
  }

  return output;
};

const input = getPuzzle(__dirname).input;
run(() => day23p1(input)); // 19040
