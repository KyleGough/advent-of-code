export interface Packet {
  version: number;
  type: number;
  value?: number;
  children: Packet[];
}

export const hexToBin = (hex: string): string => {
  return parseInt(hex, 16).toString(2).padStart(4, '0');
};

export const parsePacket = (binary: string): [Packet, string] => {
  const version = parseInt(binary.slice(0, 3), 2);
  const type = parseInt(binary.slice(3, 6), 2);

  if (type === 4) {
    const [value, nextBinary] = parseLiteralValue(binary.slice(6));
    return [{ version, type, value, children: [] }, nextBinary];
  } else {
    const lengthType = binary.charAt(6);
    if (lengthType === '0') {
      const subLength = parseInt(binary.slice(7, 22), 2);
      const subBinary = binary.slice(22, 22 + subLength);
      const children = parseVariableSubPackets(subBinary);
      return [{ version, type, children }, binary.slice(22 + subLength)];
    } else {
      const subCount = parseInt(binary.slice(7, 18), 2);
      const subBinary = binary.slice(18);
      const [children, nextBinary] = parseFixedSubPackets(subBinary, subCount);
      return [{ version, type, children }, nextBinary];
    }
  }
};

const parseLiteralValue = (binary: string): [number, string] => {
  const value = [];

  let terminate = false;
  let pointer = 0;

  while (!terminate) {
    value.push(binary.slice(pointer + 1, pointer + 5));

    if (binary.charAt(pointer) === '0') {
      terminate = true;
    }

    pointer += 5;
  }

  return [parseInt(value.join(''), 2), binary.slice(pointer)];
};

const parseVariableSubPackets = (binary: string): Packet[] => {
  const children: Packet[] = [];
  let nextBinary = binary;
  let childPacket: Packet;
  while (nextBinary.length) {
    [childPacket, nextBinary] = parsePacket(nextBinary);
    children.push(childPacket);
  }

  return children;
};

const parseFixedSubPackets = (
  binary: string,
  count: number
): [Packet[], string] => {
  const children: Packet[] = [];
  let childPacket: Packet;
  let nextBinary = binary;
  for (let i = 0; i < count; i++) {
    [childPacket, nextBinary] = parsePacket(nextBinary);
    children.push(childPacket);
  }
  return [children, nextBinary];
};
