type Instruction = Mask | Memory;

type Mask = {
  type: 'mask';
  value: string;
};

type Memory = {
  type: 'mem';
  address: string;
  value: string;
};

export const parseInstruction = (input: string): Instruction => {
  if (input.includes('mask')) {
    const mask = input.split(' = ')[1];
    return {
      type: 'mask',
      value: mask,
    };
  } else {
    const match = input.match(/mem\[(?<address>\d+)\] = (?<value>.+)/);

    if (!match) throw new Error('Unable to parse instruction');

    const address = match.groups?.address;
    const value = match.groups?.value;

    if (!address || !value) throw new Error('Unable to parse instruction');

    return {
      type: 'mem',
      address,
      value: parseInt(value).toString(2),
    };
  }
};

export const formatBinary = (input: string): string => {
  return '0'.repeat(36).substring(input.length) + input;
};
