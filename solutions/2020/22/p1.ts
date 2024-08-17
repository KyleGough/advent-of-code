import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parsePlayer, getWinningScore } from './day22.helper';

export const day22p1 = (input: string) => {
  const players = input.split('\n\n').map(parsePlayer);

  while (players.every((player) => player.length !== 0)) {
    const card1 = players[0].shift() as number;
    const card2 = players[1].shift() as number;

    if (card1 > card2) {
      players[0].push(card1);
      players[0].push(card2);
    } else {
      players[1].push(card2);
      players[1].push(card1);
    }
  }

  const winner = players.find((player) => player.length) as number[];
  return getWinningScore(winner);
};

const input = getPuzzle(__dirname).input;
run(() => day22p1(input)); // 35562
