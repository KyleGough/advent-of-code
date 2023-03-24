const rotateArrayLeft = (arr: string[], n: number): string[] => {
  n = n % arr.length;
  return arr.slice(n, arr.length).concat(arr.slice(0, n));
};

const swapPosition = (input: string, cipherText: string[]): string[] => {
  const swapPositionMatch = input.match(
    /swap position (\d+) with position (\d+)/
  );
  if (swapPositionMatch) {
    const x = parseInt(swapPositionMatch[1]);
    const y = parseInt(swapPositionMatch[2]);
    const tmp = cipherText[x];
    cipherText[x] = cipherText[y];
    cipherText[y] = tmp;
  }

  return cipherText;
};

const swapLetter = (input: string, cipherText: string[]): string[] => {
  const swapLetterMatch = input.match(/swap letter (\w) with letter (\w)/);
  if (swapLetterMatch) {
    const x = swapLetterMatch[1];
    const y = swapLetterMatch[2];
    cipherText = cipherText.map((char) =>
      char === x ? y : char === y ? x : char
    );
  }

  return cipherText;
};

const rotateFixed = (
  input: string,
  cipherText: string[],
  reverse: boolean
): string[] => {
  const rotateFixedMatch = input.match(/rotate (left|right) (\d+) step/);
  if (rotateFixedMatch) {
    let rotations = parseInt(rotateFixedMatch[2]);
    if ((rotateFixedMatch[1] === 'right') !== reverse) {
      rotations *= -1;
    }
    return rotateArrayLeft(cipherText, rotations);
  }

  return cipherText;
};

const rotateRelative = (
  input: string,
  cipherText: string[],
  reverse: boolean
): string[] => {
  const rotateRelativeMatch = input.match(
    /rotate based on position of letter (\w)/
  );
  if (rotateRelativeMatch) {
    const index = cipherText.indexOf(rotateRelativeMatch[1]);
    if (reverse) {
      let x = 0;
      let y = 0;

      cipherText = rotateArrayLeft(cipherText, 1);

      while (cipherText.indexOf(rotateRelativeMatch[1]) !== y) {
        cipherText = rotateArrayLeft(cipherText, 1);
        x++;
        y = x >= 4 ? x - 1 : x;
      }

      return cipherText;
    } else {
      let rotations = -(index >= 4 ? index + 2 : index + 1);
      if (reverse) rotations *= -1;
      return rotateArrayLeft(cipherText, rotations);
    }
  }

  return cipherText;
};

const reversePositions = (input: string, cipherText: string[]): string[] => {
  const reverseMatch = input.match(/reverse positions (\d+) through (\d+)/);
  if (reverseMatch) {
    const x = parseInt(reverseMatch[1]);
    const y = parseInt(reverseMatch[2]);
    const section = cipherText.slice(x, y + 1);
    section.reverse();
    return [...cipherText.slice(0, x), ...section, ...cipherText.slice(y + 1)];
  }

  return cipherText;
};

const movePositions = (
  input: string,
  cipherText: string[],
  reverse: boolean
): string[] => {
  const moveMatch = input.match(/move position (\d+) to position (\d+)/);
  if (moveMatch) {
    const x = parseInt(moveMatch[reverse ? 2 : 1]);
    const y = parseInt(moveMatch[reverse ? 1 : 2]);
    const tmp = cipherText[x];
    cipherText.splice(x, 1);
    cipherText.splice(y, 0, tmp);
  }

  return cipherText;
};

export const nextCipher = (
  input: string,
  cipherText: string[],
  reverse: boolean
): string[] => {
  cipherText = swapPosition(input, cipherText);
  cipherText = swapLetter(input, cipherText);
  cipherText = rotateFixed(input, cipherText, reverse);
  cipherText = rotateRelative(input, cipherText, reverse);
  cipherText = reversePositions(input, cipherText);
  cipherText = movePositions(input, cipherText, reverse);
  return cipherText;
};
