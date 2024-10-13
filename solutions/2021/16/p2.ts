import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { hexToBin, parsePacket, Packet } from './day16.helper';
import { product, sum } from '@utilities/reduce';

export const day16p2 = (input: string) => {
  const binary = input.split('').map(hexToBin).join('');
  const [packet] = parsePacket(binary);
  return getPacketValue(packet);
};

const getPacketValue = (packet: Packet): number => {
  const values = packet.children.map(getPacketValue);

  switch (packet.type) {
    case 0:
      return values.reduce(sum, 0);
    case 1:
      return values.reduce(product, 1);
    case 2:
      return Math.min(...values);
    case 3:
      return Math.max(...values);
    case 5:
      return values[0] > values[1] ? 1 : 0;
    case 6:
      return values[0] < values[1] ? 1 : 0;
    case 7:
      return values[0] === values[1] ? 1 : 0;
    default:
      return packet.value as number;
  }
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 13476220616073
