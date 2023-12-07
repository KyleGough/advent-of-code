const handTypes = [
  'Five of a kind',
  'Four of a kind',
  'Full house',
  'Three of a kind',
  'Two pair',
  'One pair',
  'High card',
] as const;

export type HandType = typeof handTypes[number];

export interface Hand {
  cards: string;
  bid: number;
  type: HandType;
}

const sortHands = (handA: Hand, handB: Hand, cardOrder: string[]): number => {
  for (let i = 0; i < 5; i++) {
    const indexA = cardOrder.indexOf(handA.cards[i]);
    const indexB = cardOrder.indexOf(handB.cards[i]);
    if (indexA < indexB) return -1;
    if (indexA > indexB) return 1;
  }

  return 0;
};

export const getCardCounts = <T>(
  cards: string,
  format: (counts: Record<string, number>) => T
): T => {
  const counts = cards.split('').reduce((prev, curr) => {
    if (prev[curr]) {
      return {
        ...prev,
        [curr]: prev[curr] + 1,
      };
    } else {
      return {
        ...prev,
        [curr]: 1,
      };
    }
  }, {} as Record<string, number>);

  return format(counts);
};

export const getTotalWinnings = (
  hands: Hand[],
  cardOrder: string[]
): number => {
  const sortedHands: Hand[] = [];

  for (let i = 0; i < handTypes.length; i++) {
    const filteredHands = hands.filter((hand) => hand.type === handTypes[i]);
    sortedHands.push(
      ...filteredHands.sort((a, b) => sortHands(a, b, cardOrder))
    );
  }

  let total = 0;
  const handCount = hands.length;
  for (let i = 0; i < handCount; i++) {
    total += sortedHands[i].bid * (handCount - i);
  }

  return total;
};
