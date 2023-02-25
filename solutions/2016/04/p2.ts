import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { isRealRoom, parseRoom } from './day04.helper';

const rot = (char: string, key: number): string => {
  let charCode = char.charCodeAt(0);

  if (charCode >= 97 && charCode <= 122) {
    charCode = 97 + ((charCode - 97 + key) % 26);
    return String.fromCharCode(charCode);
  }

  return ' ';
};

export const day04p2 = (input: string) => {
  const rooms = input.split('\n').map(parseRoom).filter(isRealRoom);

  for (let i = 0; i < rooms.length; i++) {
    const sector = rooms[i].sector;
    const decryptedName = rooms[i].name
      .split('')
      .map((i) => rot(i, sector))
      .join('');

    if (decryptedName.includes('north')) {
      return rooms[i].sector;
    }
  }

  return 0;
};

const input = getPuzzle(__dirname).input;
run(() => day04p2(input)); // 324
