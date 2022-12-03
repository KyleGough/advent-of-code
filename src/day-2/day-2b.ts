import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputData = readFileSync(resolve(__dirname, 'input'), 'utf-8');
const rounds = inputData.split('\n');

let totalScore = 0;

const choiceScore: Record<string, number> = {
  // Rock
  A: 1,
  // Paper
  B: 2,
  // Scissors
  C: 3,
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

console.log(totalScore);
