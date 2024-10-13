import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { hexToBin, parsePacket, Packet } from './day16.helper';

export const day16p1 = (input: string) => {
  const binary = input.split('').map(hexToBin).join('');
  const [packet] = parsePacket(binary);
  return countVersionNumbers(packet);
};

const countVersionNumbers = (packet: Packet): number => {
  return (
    packet.version + packet.children.map(countVersionNumbers).reduce(sum, 0)
  );
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 940
