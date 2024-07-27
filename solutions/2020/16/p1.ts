import { getPuzzle } from '@utilities/getPuzzle';
import { sum } from '@utilities/reduce';
import { run } from '@utilities/run';
import { parseInput, isTicketValueValid } from './day16.helper';

export const day16p1 = (input: string) => {
  const { rules, tickets } = parseInput(input);
  const strippedRules = Object.values(rules);
  const invalidTickets = tickets
    .flat()
    .filter((t) => !isTicketValueValid(t, strippedRules.flat()));
  const ticketErrorRate = invalidTickets.reduce(sum, 0);
  return ticketErrorRate;
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 23115
