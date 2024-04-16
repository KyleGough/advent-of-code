import { max } from '@utilities/reduce';

export const parseInput = (input: string): [number, number] => {
  const words = input.split(' ');
  return [parseInt(words[0]), parseInt(words[6])];
};

type Marble = {
  value: number;
  prev: Marble;
  next: Marble;
};

const getInitialMarble = (): Marble => {
  const current = { value: 0 } as Marble;
  current.prev = current;
  current.next = current;
  return current;
};

export const getElfScore = (
  playerCount: number,
  marbleCount: number
): number => {
  const scores = new Array(playerCount).fill(0);

  let current = getInitialMarble();

  for (let m = 1; m <= marbleCount; m++) {
    if (m % 23 === 0) {
      const removalMarble = current.prev.prev.prev.prev.prev.prev.prev;
      scores[m % playerCount] += removalMarble.value + m;
      removalMarble.prev.next = removalMarble.next;
      removalMarble.next.prev = removalMarble.prev;
      current = removalMarble.next;
    } else {
      const marble = { value: m, prev: current.next, next: current.next.next };
      current.next.next.prev = marble;
      current.next.next = marble;
      current = marble;
    }
  }

  return scores.reduce(max);
};
