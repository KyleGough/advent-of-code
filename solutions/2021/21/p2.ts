import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';

export const day21p2 = (input: string) => {
  const players = input.split('\n').map((p) => matchNumbers(p)[1] - 1);
  return Math.max(...countWins(players, [21, 21]));
};

// For three dice, the mapping of total roll count to number of occurences.
const diracRolls: Record<number, number> = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

// Memoizes wins.
const winCache: Record<string, number[]> = {};

const countWins = (players: number[], scores: number[]): number[] => {
  // If player 2 has no remaining score to achieve, mark as a win.
  if (scores[1] <= 0) return [0, 1];

  // Checks cache for pre-existing calculations.
  const cacheKey = [...players, ...scores].join(',');
  if (winCache.hasOwnProperty(cacheKey)) {
    return winCache[cacheKey];
  }

  const totalWins = [0, 0];

  for (const roll of Object.keys(diracRolls)) {
    const count = diracRolls[parseInt(roll)];
    const nextPlayers = [players[1], (players[0] + parseInt(roll)) % 10];
    const nextScores = [scores[1], scores[0] - nextPlayers[1] - 1];
    const stageWins = countWins(nextPlayers, nextScores);
    totalWins[0] += count * stageWins[1];
    totalWins[1] += count * stageWins[0];
  }

  // Adds record to the cache.
  if (!winCache.hasOwnProperty(cacheKey)) {
    winCache[cacheKey] = totalWins;
  }

  return totalWins;
};

const input = getPuzzle(__dirname).input;
run(() => day21p2(input)); // 49982165861983
