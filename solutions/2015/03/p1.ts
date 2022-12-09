import { getPuzzle } from '@utilities/getPuzzle';

export const day03p1 = (input: string) => {
  const instructions = input.split('');
  const visitedHouses = new Set<string>([[0, 0].toString()]);
  let x = 0;
  let y = 0;

  for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i]) {
      case '^':
        y++;
        break;
      case '<':
        x--;
        break;
      case '>':
        x++;
        break;
      default:
        y--;
    }

    const house = [x, y].toString();
    if (!visitedHouses.has(house)) {
      visitedHouses.add(house);
    }
  }

  return visitedHouses.size;
};

const input = getPuzzle(__dirname).input;
console.log(day03p1(input)); // 2572
