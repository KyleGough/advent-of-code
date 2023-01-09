import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

interface Room {
  name: string;
  sector: number;
  checksum: string[];
}

const parseRoom = (input: string): Room => {
  const matches = input.match(
    /(?<name>.*)-(?<sector>\d+)\[(?<checksum>[a-z]{5})\]/
  )?.groups;

  if (!matches) throw new Error('Unable to parse room');

  return {
    name: matches.name,
    sector: parseInt(matches.sector),
    checksum: matches.checksum.split(''),
  };
};

const countLetters = (encryptedName: string): Record<string, number> => {
  const letterCount: Record<string, number> = {};

  for (let i = 0; i < encryptedName.length; i++) {
    const letter = encryptedName.charAt(i);

    if (letter === '-') continue;

    if (!letterCount[letter]) {
      letterCount[letter] = 1;
    } else {
      letterCount[letter]++;
    }
  }

  return letterCount;
};

const topLetters = (letterCount: Record<string, number>): string[] => {
  const counts = Object.entries(letterCount);
  counts.sort((a, b) => b[1] - a[1]);

  const fifthCount = counts[4][1];
  const topLetters: string[] = [];

  topLetters.push(...counts.filter((i) => i[1] > fifthCount).map((i) => i[0]));

  const matchLetters = counts
    .filter((i) => i[1] === fifthCount)
    .map((i) => i[0]);
  matchLetters.sort();
  topLetters.push(...matchLetters.slice(0, 5 - topLetters.length));

  return topLetters;
};

export const day04p1 = (input: string) => {
  const rooms = input.split('\n').map(parseRoom);
  let sectorSum = 0;

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const letterCount = countLetters(room.name);
    const commonLetters = new Set<string>([
      ...topLetters(letterCount),
      ...room.checksum,
    ]);

    if (commonLetters.size === 5) {
      sectorSum += room.sector;
    }
  }

  return sectorSum;
};

const input = getPuzzle(__dirname).input;
run(() => day04p1(input)); // 245102
