import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { NetworkedComputer } from './day23.helper';

export const day23p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  const networkSize = 50;
  const network: NetworkedComputer[] = [];
  const natHistory = new Set<number>();
  let nat: number[] = [];
  let terminate = false;

  const sendSignal = (destination: number, x: number, y: number) => {
    if (destination === 255) {
      nat = [x, y];
    } else {
      network[destination].inputBuffer.push(x, y);
    }
  };

  // Initialise network.
  for (let i = 0; i < networkSize; i++) {
    network.push(new NetworkedComputer(i, [...nums], network, sendSignal));
  }

  while (!terminate) {
    network.forEach((computer) => computer.processStep());

    // Check if the system is in an idle state.
    if (isNetworkIdle(network)) {
      // Send NAT packet to computer 0.
      network[0].inputBuffer.push(...nat);

      // Record and check NAT history of y values.
      if (natHistory.has(nat[1])) {
        terminate = true;
      } else {
        natHistory.add(nat[1]);
      }
    }
  }

  return nat[1];
};

const isNetworkIdle = (network: NetworkedComputer[]): boolean => {
  for (const computer of network) {
    if (!computer.idle) {
      return false;
    }
  }

  return true;
};

const input = getPuzzle(__dirname).input;
run(() => day23p2(input)); // 11041
