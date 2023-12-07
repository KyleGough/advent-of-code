import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  getCardCounts,
  getTotalWinnings,
  Hand,
  HandType,
} from './day07.helper';

export const day07p1 = (input: string) => {
  const hands = input.split('\n').map(parseHand);
  const cardOrder = 'AKQJT98765432'.split('');
  return getTotalWinnings(hands, cardOrder);
};

const parseHand = (input: string): Hand => {
  const cards = input.substring(0, 5);
  const counts = getCardCounts(cards, formatCounts);
  let type: HandType;

  if (counts[0] === 5) {
    type = 'Five of a kind';
  } else if (counts[0] === 4) {
    type = 'Four of a kind';
  } else if (counts[0] === 3 && counts[1] === 2) {
    type = 'Full house';
  } else if (counts[0] === 3) {
    type = 'Three of a kind';
  } else if (counts[0] === 2 && counts[1] === 2) {
    type = 'Two pair';
  } else if (counts[0] === 2) {
    type = 'One pair';
  } else {
    type = 'High card';
  }

  return {
    cards,
    bid: parseInt(input.split(' ')[1]),
    type,
  };
};

const formatCounts = (counts: Record<string, number>): number[] => {
  return Object.values(counts).sort((a, b) => b - a);
};

const input = getPuzzle(__dirname).input;
run(() => day07p1(input)); // 253205868
