import { readFileSync } from 'fs';
import { resolve } from 'path';

const inputData = readFileSync(resolve(__dirname, 'input'), 'utf-8');
const rounds = inputData.split('\n');

let totalScore = 0;

const choiceScore: Record<string, number> = {
  // Rock
  A: 1,
  X: 1,
  // Paper
  B: 2,
  Y: 2,
  // Scissors
  C: 3,
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

console.log(totalScore);
