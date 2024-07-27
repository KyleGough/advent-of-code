import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseInput, isTicketValueValid } from './day16.helper';

export const day16p2 = (input: string) => {
  const { rules, ownTicket, tickets } = parseInput(input);
  const keys = Object.keys(rules);
  const strippedRules = Object.values(rules);
  const validTickets = tickets.filter((t) =>
    isTicketValid(t, strippedRules.flat())
  );

  validTickets.push(ownTicket);

  const validPositions: Record<string, Set<number>> = keys.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: new Set([...Array(ownTicket.length).keys()]),
    }),
    {}
  );

  // Reduce possibility space via rules.
  for (const key of keys) {
    for (let pos = 0; pos < ownTicket.length; pos++) {
      const ticket = validTickets.map((t) => t[pos]);
      if (!isTicketValid(ticket, rules[key])) {
        validPositions[key].delete(pos);
      }
    }
  }

  let foundAllPositions = false;
  let product = 1;

  // Eliminate positions one-by-one.
  while (!foundAllPositions) {
    foundAllPositions = true;

    for (const key of keys) {
      if (validPositions[key].size === 1) {
        const foundPosition = [...validPositions[key]][0];

        if (key.startsWith('departure')) {
          product *= ownTicket[foundPosition];
        }

        for (const key of keys) {
          validPositions[key].delete(foundPosition);
        }

        foundAllPositions = false;
        break;
      }
    }
  }

  return product;
};

const isTicketValid = (ticket: number[], rules: number[][]): boolean => {
  for (const value of ticket) {
    if (!isTicketValueValid(value, rules)) {
      return false;
    }
  }

  return true;
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 239727793813
