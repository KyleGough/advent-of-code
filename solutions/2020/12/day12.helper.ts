interface Instruction {
  heading: string;
  value: number;
}

export interface Coord {
  x: number;
  y: number;
}

export const parseInstruction = (input: string): Instruction => {
  return {
    heading: input.charAt(0),
    value: parseInt(input.slice(1)),
  };
};

export const traverse = (direction: string, value: number, coord: Coord) => {
  switch (direction) {
    case 'N':
      coord.y -= value;
      break;
    case 'E':
      coord.x += value;
      break;
    case 'S':
      coord.y += value;
      break;
    case 'W':
      coord.x -= value;
      break;
  }
};
