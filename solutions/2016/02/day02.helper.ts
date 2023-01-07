export const getKeypadButton = (lines: string[], keypad: string[][]) => {
  let output = '';
  let [x, y] = getStartButton(keypad);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      if (line.charAt(j) === 'U' && y - 1 >= 0 && keypad[y - 1][x] !== '') {
        y--;
      } else if (
        line.charAt(j) === 'L' &&
        x - 1 >= 0 &&
        keypad[y][x - 1] !== ''
      ) {
        x--;
      } else if (
        line.charAt(j) === 'D' &&
        y + 1 < keypad.length &&
        keypad[y + 1][x] !== ''
      ) {
        y++;
      } else if (
        line.charAt(j) === 'R' &&
        x + 1 < keypad[y].length &&
        keypad[y][x + 1] !== ''
      ) {
        x++;
      }
    }

    output += keypad[y][x];
  }

  return output;
};

const getStartButton = (keypad: string[][]): [number, number] => {
  for (let i = 0; i < keypad.length; i++) {
    for (let j = 0; j < keypad[i].length; j++) {
      if (keypad[i][j] === '5') {
        return [j, i];
      }
    }
  }

  return [0, 0];
};
