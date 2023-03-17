const getFilledData = (input: string[], diskSize: number): string[] => {
  let data = input;

  while (data.length < diskSize) {
    const a = data;
    let b = [...a];
    b.reverse();
    b = b.map((x) => (x === '0' ? '1' : '0'));
    data = [...a, '0', ...b];
  }

  return data.slice(0, diskSize);
};

const getChecksumStep = (input: string[]): string[] => {
  const checksum = [];

  for (let i = 0; i < input.length; i += 2) {
    checksum.push(input[i] === input[i + 1] ? '1' : '0');
  }

  return checksum;
};

export const getChecksum = (input: string[], diskSize: number): string => {
  const completeData = getFilledData(input, diskSize);
  let checksum = getChecksumStep(completeData);

  while (checksum.length % 2 === 0) {
    checksum = getChecksumStep(checksum);
  }

  return checksum.join('');
};
