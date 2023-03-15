interface Disk {
  positions: number;
  currPosition: number;
}

export const parseDisc = (input: string): Disk => {
  const discMatch = input.match(
    /has (?<pos>\d+) .* at position (?<curr>\d+)/
  )?.groups;

  if (!discMatch) throw new Error('Unable to parse disc');

  return {
    positions: parseInt(discMatch.pos),
    currPosition: parseInt(discMatch.curr),
  };
};

export const getTimeForCapsule = (discs: Disk[]): number => {
  let validCapsule = false;
  let time = 0;

  while (!validCapsule) {
    validCapsule = true;

    for (let i = 0; i < discs.length; i++) {
      const discOffset = time + i + 1;
      const discPos = (discs[i].currPosition + discOffset) % discs[i].positions;
      if (discPos !== 0) {
        validCapsule = false;
        break;
      }
    }

    time++;
  }

  return time - 1;
};
