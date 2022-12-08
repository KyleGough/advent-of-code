import { getPuzzle } from '@utilities/getPuzzle';

export const day02p2 = (input: string) => {
  const rounds = input.split('\n');

  let totalScore = 0;

  const choiceScore: Record<string, number> = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
  };

  const modulo3 = (n: number) => ((((n - 1) % 3) + 3) % 3) + 1;

  for (let i = 0; i < rounds.length; i++) {
    const [opponent, challenger] = rounds[i].split(' ');
    const opponentNum = choiceScore[opponent];
    console.log(opponent, challenger);

    if (challenger === 'Y') {
      totalScore += opponentNum + 3;
    } else if (challenger === 'X') {
      totalScore += modulo3(opponentNum - 1);
    } else {
      totalScore += modulo3(opponentNum + 1) + 6;
    }
  }

  return totalScore;
};

const input = getPuzzle(__dirname).input;
console.log(day02p2(input)); // 10398
