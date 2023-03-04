interface Operation {
  op: number;
  a: number;
  b: number;
}

type Board = boolean[][];

export const parseOperation = (input: string): Operation => {
  const rectMatch = input.match(/rect (?<a>\d+)x(?<b>\d+)/)?.groups;
  const rotRowMatch = input.match(/row y=(?<a>\d+) by (?<b>\d+)/)?.groups;
  const rotColMatch = input.match(/column x=(?<a>\d+) by (?<b>\d+)/)?.groups;

  if (rectMatch) {
    return transformMatch(1, rectMatch);
  } else if (rotRowMatch) {
    return transformMatch(2, rotRowMatch);
  } else if (rotColMatch) {
    return transformMatch(3, rotColMatch);
  } else {
    throw new Error('Unable to parse operation');
  }
};

const transformMatch = (opCode: number, matches: { [key: string]: string }) => {
  return { op: opCode, a: parseInt(matches.a), b: parseInt(matches.b) };
};

const initialiseBoard = (width: number, height: number): Board => {
  const board = [];

  for (let y = 0; y < height; y++) {
    board.push(Array(width).fill(false));
  }

  return board;
};

const fillRectangle = (board: Board, a: number, b: number): Board => {
  for (let y = 0; y < b; y++) {
    for (let x = 0; x < a; x++) {
      board[y][x] = true;
    }
  }

  return board;
};

const rotateRow = (
  board: Board,
  a: number,
  b: number,
  width: number
): Board => {
  const shift = b % width;

  for (let i = 0; i < shift; i++) {
    board[a].unshift(board[a].pop() as boolean);
  }

  return board;
};

const rotateColumn = (
  board: Board,
  a: number,
  b: number,
  height: number
): Board => {
  for (let i = 0; i < b % height; i++) {
    const tmp = board[height - 1][a];

    for (let y = height - 1; y > 0; y--) {
      board[y][a] = board[y - 1][a];
    }

    board[0][a] = tmp;
  }

  return board;
};

export const executeOperations = (
  operations: Operation[],
  width: number,
  height: number
): Board => {
  let board = initialiseBoard(width, height);

  for (let i = 0; i < operations.length; i++) {
    const { op, a, b } = operations[i];

    if (op === 1) {
      board = fillRectangle(board, a, b);
    } else if (op === 2) {
      board = rotateRow(board, a, b, width);
    } else {
      board = rotateColumn(board, a, b, height);
    }
  }

  return board;
};
