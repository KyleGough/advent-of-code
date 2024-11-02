import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInstruction } from './day22.helper';

export const day22p1 = (input: string) => {
  const instructions = input.split('\n').map(parseInstruction);
  const size = 10007;

  let deck = Array(size)
    .fill(0)
    .map((_, i) => i);

  for (const instruction of instructions) {
    switch (instruction.type) {
      case 'DEAL_STACK':
        deck = deck.reverse();
        break;
      case 'DEAL':
        deck = dealIncrementDeck(deck, instruction.value);
        break;
      case 'CUT':
        deck = cutDeck(deck, instruction.value);
        break;
    }
  }

  return deck.indexOf(2019);
};

const dealIncrementDeck = (deck: number[], n: number): number[] => {
  const nextDeck = Array(deck.length);
  let step = 0;

  for (let x = 0; x < deck.length; x++) {
    nextDeck[step % deck.length] = deck[x];
    step += n;
  }

  return nextDeck;
};

const cutDeck = (deck: number[], n: number): number[] => {
  return [...deck.slice(n), ...deck.slice(0, n)];
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 8502
