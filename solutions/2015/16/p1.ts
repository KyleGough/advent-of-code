import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

const compounds: Record<string, number> = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

export const day16p1 = (input: string) => {
  const sues = input.split('\n');

  for (let i = 0; i < sues.length; i++) {
    let correctSue = true;

    for (const compound in compounds) {
      const regex = new RegExp(`${compound}: (\\d+)`, 'i');
      const match = sues[i].match(regex);
      if (match && parseInt(match[1]) !== compounds[compound]) {
        correctSue = false;
        break;
      }
    }

    if (correctSue) {
      return parseInt((sues[i].match(/Sue (\d+)/) as RegExpMatchArray)[1]);
    }
  }
};

const input = getPuzzle(__dirname).input;
run(() => day16p1(input)); // 40
