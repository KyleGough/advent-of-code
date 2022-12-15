import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

interface Position {
  x: number;
  y: number;
}

const moveSanta = (santa: Position, direction: string): Position => {
  switch (direction) {
    case '^':
      return { ...santa, y: santa.y + 1 };
    case '<':
      return { ...santa, x: santa.x - 1 };
    case '>':
      return { ...santa, x: santa.x + 1 };
    default:
      return { ...santa, y: santa.y - 1 };
  }
};

export const day03p2 = (input: string) => {
  const instructions = input.split('');
  const visitedHouses = new Set<string>([[0, 0].toString()]);

  let santa: Position = { x: 0, y: 0 };
  let roboSanta: Position = { x: 0, y: 0 };

  for (let i = 0; i < instructions.length - 1; i += 2) {
    santa = moveSanta(santa, instructions[i]);
    roboSanta = moveSanta(roboSanta, instructions[i + 1]);

    const santaHouse = [santa.x, santa.y].toString();
    const roboSantaHouse = [roboSanta.x, roboSanta.y].toString();

    if (!visitedHouses.has(santaHouse)) {
      visitedHouses.add(santaHouse);
    }
    if (!visitedHouses.has(roboSantaHouse)) {
      visitedHouses.add(roboSantaHouse);
    }
  }

  return visitedHouses.size;
};

const input = getPuzzle(__dirname).input;
run(() => day03p2(input)); // 2631
