import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parsePlayer, getWinningScore } from './day22.helper';

export const day22p2 = (input: string) => {
  const players = input.split('\n\n').map(parsePlayer);
  const winner = playGame(players).cards;
  return getWinningScore(winner);
};

interface Result {
  id: number;
  cards: number[];
}

const playGame = (players: number[][]): Result => {
  const previousRounds = new Set<string>();

  while (players.every((player) => player.length !== 0)) {
    // Check for previous round with same configuration.
    const gameState = getGameState(players);
    if (previousRounds.has(gameState)) {
      return { id: 0, cards: players[0] };
    } else {
      previousRounds.add(gameState);
    }

    const card1 = players[0].shift() as number;
    const card2 = players[1].shift() as number;
    let winner: number;

    if (players[0].length >= card1 && players[1].length >= card2) {
      // Start new game of recursive combat.
      winner = playGame([
        [...players[0].slice(0, card1)],
        [...players[1].slice(0, card2)],
      ]).id;
    } else {
      winner = card1 > card2 ? 0 : 1;
    }

    if (winner === 0) {
      players[0].push(card1);
      players[0].push(card2);
    } else {
      players[1].push(card2);
      players[1].push(card1);
    }
  }

  return {
    id: players[0].length ? 0 : 1,
    cards: players[0].length ? players[0] : players[1],
  };
};

const getGameState = (players: number[][]): string => {
  return players.map((player) => player.join(',')).join('#');
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 34424
