import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  Board,
  Player,
  initialPosition,
  turnPlayer,
  getPassword,
} from './day22.helper';

const faces = [
  { minX: 100, maxX: 149, minY: 0, maxY: 49 },
  { minX: 50, maxX: 99, minY: 0, maxY: 49 },
  { minX: 50, maxX: 99, minY: 50, maxY: 99 },
  { minX: 50, maxX: 99, minY: 100, maxY: 149 },
  { minX: 0, maxX: 49, minY: 100, maxY: 149 },
  { minX: 0, maxX: 49, minY: 150, maxY: 199 },
];

const getFaceNumber = (x: number, y: number): number => {
  for (let i = 0; i < 6; i++) {
    if (
      x >= faces[i].minX &&
      x <= faces[i].maxX &&
      y >= faces[i].minY &&
      y <= faces[i].maxY
    ) {
      return i;
    }
  }

  return -1;
};

const movePlayerRight = (player: Player, board: Board, distance: number) => {
  for (let i = 0; i < distance; i++) {
    const currentFace = getFaceNumber(player.x, player.y);
    const targetFace = getFaceNumber(player.x + 1, player.y);
    const targetTile = board[player.y][player.x + 1];

    // If the face will not change (or face 1, 4)
    if (currentFace === targetFace || currentFace === 1 || currentFace === 4) {
      if (targetTile === '.') {
        player.x++;
        continue;
      } else if (targetTile === '#') {
        return;
      }
    }

    let mappedX, mappedY, mappedDirection;

    switch (currentFace) {
      case 0: // Transform face 0 to face 3.
        mappedX = faces[3].maxX;
        mappedY = faces[3].maxY - (player.y - faces[0].minY);
        mappedDirection = 2;
        break;
      case 2: // Transform face 2 to face 0.
        mappedX = player.y - faces[2].minY + faces[0].minX;
        mappedY = faces[0].maxY;
        mappedDirection = 3;
        break;
      case 3: // Transform face 3 to face 0.
        mappedX = faces[0].maxX;
        mappedY = faces[0].maxY - (player.y - faces[3].minY);
        mappedDirection = 2;
        break;
      default: // Transform face 5 to face 3.
        mappedX = player.y - faces[5].minY + faces[3].minX;
        mappedY = faces[3].maxY;
        mappedDirection = 3;
        break;
    }

    const mappedTile = board[mappedY][mappedX];

    if (mappedTile === '.') {
      player.x = mappedX;
      player.y = mappedY;
      player.facing = mappedDirection;
      movePlayer(player, board, distance - i - 1);
    }

    return;
  }
};

const movePlayerLeft = (player: Player, board: Board, distance: number) => {
  for (let i = 0; i < distance; i++) {
    const currentFace = getFaceNumber(player.x, player.y);
    const targetFace = getFaceNumber(player.x - 1, player.y);
    const targetTile = board[player.y][player.x - 1];

    // If the face will not change (or face 0, 3)
    if (currentFace === targetFace || currentFace === 0 || currentFace === 3) {
      if (targetTile === '.') {
        player.x--;
        continue;
      } else if (targetTile === '#') {
        return;
      }
    }

    let mappedX, mappedY, mappedDirection;

    switch (currentFace) {
      case 1: // Transform face 1 to face 4.
        mappedX = faces[4].minX;
        mappedY = faces[4].maxY - (player.y - faces[1].minY);
        mappedDirection = 0;
        break;
      case 2: // Transform face 2 to face 4.
        mappedX = faces[4].minX + player.y - faces[2].minY;
        mappedY = faces[4].minY;
        mappedDirection = 1;
        break;
      case 4: // Transform face 4 to face 1.
        mappedX = faces[1].minX;
        mappedY = faces[1].maxY - (player.y - faces[4].minY);
        mappedDirection = 0;
        break;
      default: // Transform face 5 to face 1.
        mappedX = player.y - faces[5].minY + faces[1].minX;
        mappedY = faces[1].minY;
        mappedDirection = 1;
        break;
    }

    const mappedTile = board[mappedY][mappedX];

    if (mappedTile === '.') {
      player.x = mappedX;
      player.y = mappedY;
      player.facing = mappedDirection;
      movePlayer(player, board, distance - i - 1);
    }

    return;
  }
};

const movePlayerUp = (player: Player, board: Board, distance: number) => {
  for (let i = 0; i < distance; i++) {
    const currentFace = getFaceNumber(player.x, player.y);
    const targetFace = getFaceNumber(player.x, player.y - 1);
    const targetTile = board[player.y - 1]?.[player.x];

    // If the face will not change (or face 2, 3, 5)
    if (
      currentFace === targetFace ||
      currentFace === 2 ||
      currentFace === 3 ||
      currentFace === 5
    ) {
      if (targetTile === '.') {
        player.y--;
        continue;
      } else if (targetTile === '#') {
        return;
      }
    }

    let mappedX, mappedY, mappedDirection;

    switch (currentFace) {
      case 0: // Transform face 0 to face 5.
        mappedX = player.x - faces[0].minX + faces[5].minX;
        mappedY = faces[5].maxY;
        mappedDirection = 3;
        break;
      case 1: // Transform face 1 to face 5.
        mappedX = faces[5].minX;
        mappedY = player.x - faces[1].minX + faces[5].minY;
        mappedDirection = 0;
        break;
      default: // Transform face 4 to face 2.
        mappedX = faces[2].minX;
        mappedY = player.x - faces[4].minX + faces[2].minY;
        mappedDirection = 0;
        break;
    }

    const mappedTile = board[mappedY][mappedX];

    if (mappedTile === '.') {
      player.x = mappedX;
      player.y = mappedY;
      player.facing = mappedDirection;
      movePlayer(player, board, distance - i - 1);
    }

    return;
  }
};

const movePlayerDown = (player: Player, board: Board, distance: number) => {
  for (let i = 0; i < distance; i++) {
    const currentFace = getFaceNumber(player.x, player.y);
    const targetFace = getFaceNumber(player.x, player.y + 1);
    const targetTile = board[player.y + 1]?.[player.x];

    // If the face will not change (or face 1, 2, 4)
    if (
      currentFace === targetFace ||
      currentFace === 1 ||
      currentFace === 2 ||
      currentFace === 4
    ) {
      if (targetTile === '.') {
        player.y++;
        continue;
      } else if (targetTile === '#') {
        return;
      }
    }

    let mappedX, mappedY, mappedDirection;

    switch (currentFace) {
      case 0: // Transform face 0 to face 2.
        mappedX = faces[2].maxX;
        mappedY = player.x - faces[0].minX + faces[2].minY;
        mappedDirection = 2;
        break;
      case 3: // Transform face 3 to face 5.
        mappedX = faces[5].maxX;
        mappedY = player.x - faces[3].minX + faces[5].minY;
        mappedDirection = 2;
        break;
      default: // Transform face 5 to face 0.
        mappedX = player.x - faces[5].minX + faces[0].minX;
        mappedY = faces[0].minY;
        mappedDirection = 1;
        break;
    }

    const mappedTile = board[mappedY][mappedX];

    if (mappedTile === '.') {
      player.x = mappedX;
      player.y = mappedY;
      player.facing = mappedDirection;
      movePlayer(player, board, distance - i - 1);
    }

    return;
  }
};

const movePlayer = (player: Player, board: Board, distance: number) => {
  switch (player.facing) {
    case 0:
      movePlayerRight(player, board, distance);
      return;
    case 1:
      movePlayerDown(player, board, distance);
      return;
    case 2:
      movePlayerLeft(player, board, distance);
      return;
    default:
      movePlayerUp(player, board, distance);
      return;
  }
};

export const day22p2 = (input: string) => {
  const [boardData, instructions] = input.split('\n\n');
  const board: Board = boardData.split('\n').map((i) => i.split(''));
  const player = initialPosition(board);
  const moveInstructions = instructions.split(/L|R/).map((i) => parseInt(i));
  const turnInstructions = instructions.split(/\d+/).slice(1, -1);

  for (let i = 0; i < moveInstructions.length; i++) {
    movePlayer(player, board, moveInstructions[i]);
    i < turnInstructions.length && turnPlayer(player, turnInstructions[i]);
  }

  return getPassword(player);
};

const input = getPuzzle(__dirname).input;
run(() => day22p2(input)); // 162038
