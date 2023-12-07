import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  getCardCounts,
  getTotalWinnings,
  Hand,
  HandType,
} from './day07.helper';

export const day07p2 = (input: string) => {
  const hands = input.split('\n').map(parseHand);
  const cardOrder = 'AKQT98765432J'.split('');
  return getTotalWinnings(hands, cardOrder);
};

const parseHand = (input: string): Hand => {
  const cards = input.substring(0, 5);
  const { counts, jokers } = getCardCounts(cards, formatCardCounts);
  let type: HandType;

  if (counts[0] + jokers === 5) {
    type = 'Five of a kind';
  } else if (counts[0] + jokers === 4) {
    type = 'Four of a kind';
  } else if (counts[0] + counts[1] + jokers === 5) {
    type = 'Full house';
  } else if (counts[0] + jokers === 3) {
    type = 'Three of a kind';
  } else if (counts[0] === 2 && counts[1] === 2) {
    type = 'Two pair';
  } else if (counts[0] + jokers === 2) {
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

const formatCardCounts = (
  counts: Record<string, number>
): { counts: number[]; jokers: number } => {
  const jokers = counts['J'] ?? 0;
  delete counts['J'];

  const nCounts = Object.values(counts).sort((a, b) => b - a);
  nCounts.push(...[0, 0]);

  return {
    counts: nCounts,
    jokers,
  };
};

const input = getPuzzle(__dirname).input;
run(() => day07p2(input)); // 253907829
