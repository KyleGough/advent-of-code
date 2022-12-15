import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day02p1 = (input: string) => {
  const rounds = input.split('\n');

  let totalScore = 0;

  const choiceScore: Record<string, number> = {
    A: 1, // Rock
    X: 1,
    B: 2, // Paper
    Y: 2,
    C: 3, // Scissors
    Z: 3,
  };

  for (let i = 0; i < rounds.length; i++) {
    const [opponent, challenger] = rounds[i].split(' ');
    const opponentNum = choiceScore[opponent];
    const challengerNum = choiceScore[challenger];
    const versusMod = (((opponentNum - challengerNum) % 3) + 3) % 3;

    switch (versusMod) {
      case 0:
        totalScore += 3 + challengerNum;
        break;
      case 1:
        totalScore += challengerNum;
        break;
      default:
        totalScore += 6 + challengerNum;
    }
  }

  return totalScore;
};

const input = getPuzzle(__dirname).input;
run(() => day02p1(input)); // 13009
