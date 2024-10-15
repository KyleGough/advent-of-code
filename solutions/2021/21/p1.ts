import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { matchNumbers } from '@utilities/string';

export const day21p1 = (input: string) => {
  const players = input.split('\n').map((p) => matchNumbers(p)[1] - 1);
  const score = [0, 0];
  const dice = new Dice(100);
  let limitReached = false;

  while (!limitReached) {
    for (let i = 0; i < players.length; i++) {
      const turn = dice.turn();
      players[i] = (players[i] + turn) % 10;
      score[i] += players[i] + 1;

      if (score[i] >= 1000) {
        limitReached = true;
        break;
      }
    }
  }

  return Math.min(score[0], score[1]) * dice.rolls;
};

class Dice {
  limit: number;
  rolls: number;

  constructor(limit: number) {
    this.limit = limit;
    this.rolls = 0;
  }

  roll(): number {
    return (this.rolls++ % this.limit) + 1;
  }

  turn(): number {
    return this.roll() + this.roll() + this.roll();
  }
}

const input = getPuzzle(__dirname).input;
run(() => day21p1(input)); // 916083
