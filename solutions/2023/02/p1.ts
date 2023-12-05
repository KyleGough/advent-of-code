import { getPuzzle } from '@utilities/getPuzzle';
import { max, sum } from '@utilities/reduce';
import { run } from '@utilities/run';

export const day02p1 = (input: string) => {
  return input.split('\n').map(parseGame).reduce(sum);
};

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

const parseGame = (input: string) => {
  const [game, data] = input.split(':');

  const reds = data.matchAll(/(\d+) red/g);
  const maxRedCount = [...reds].map((i) => parseInt(i[1])).reduce(max);
  if (maxRedCount > RED_MAX) {
    return 0;
  }

  const greens = data.matchAll(/(\d+) green/g);
  const maxGreenCount = [...greens].map((i) => parseInt(i[1])).reduce(max);
  if (maxGreenCount > GREEN_MAX) {
    return 0;
  }

  const blues = data.matchAll(/(\d+) blue/g);
  const maxBlueCount = [...blues].map((i) => parseInt(i[1])).reduce(max);
  if (maxBlueCount > BLUE_MAX) {
    return 0;
  }

  const gameId = game.match(/Game (\d+)/);

  if (!gameId || !gameId[1]) {
    throw new Error('Unable to parse Game.');
  }

  return parseInt(gameId[1]);
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 2528
