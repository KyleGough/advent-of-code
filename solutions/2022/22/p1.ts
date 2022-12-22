import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  Board,
  Player,
  initialPosition,
  turnPlayer,
  getPassword,
} from './day22.helper';

const movePlayerRight = (player: Player, row: string[], distance: number) => {
  for (let i = 0; i < distance; i++) {
    const withinBounds = player.x + 1 < row.length;
    const targetTile = withinBounds && row[player.x + 1];

    // Wrap to the left side.
    if (!withinBounds || targetTile === ' ') {
      const wrapIndex = row.findIndex((tile) => tile === '.' || tile === '#');
      if (row[wrapIndex] === '.') {
        player.x = wrapIndex;
      } else {
        return;
      }
    } else if (targetTile === '.') {
      // If the target tile is an open tile, move.
      player.x++;
    } else if (targetTile === '#') {
      // If the player hits a wall, the player can no longer move.
      return;
    }
  }
};

const movePlayerLeft = (player: Player, row: string[], distance: number) => {
  for (let i = 0; i < distance; i++) {
    const withinBounds = player.x - 1 >= 0;
    const targetTile = withinBounds && row[player.x - 1];

    // Wrap to the right side.
    if (!withinBounds || targetTile === ' ') {
      const wrapIndex =
        row.length -
        1 -
        row
          .slice()
          .reverse()
          .findIndex((tile) => tile === '.' || tile === '#');

      if (row[wrapIndex] === '.') {
        player.x = wrapIndex;
      } else {
        return;
      }
    } else if (targetTile === '.') {
      // If the target tile is an open tile, move.
      player.x--;
    } else if (targetTile === '#') {
      // If the player hits a wall, the player can no longer move.
      return;
    }
  }
};

const movePlayerUp = (player: Player, col: string[], distance: number) => {
  for (let i = 0; i < distance; i++) {
    const withinBounds = player.y - 1 >= 0;
    const targetTile = withinBounds && col[player.y - 1];

    // Wrap to the bottom.
    if (!withinBounds || targetTile === ' ') {
      for (let j = col.length - 1; j >= 0; j--) {
        if (col[j] === '.') {
          player.y = j;
          break;
        } else if (col[j] === '#') {
          return;
        }
      }
    } else if (targetTile === '.') {
      // If the target tile is an open tile, move.
      player.y--;
    } else if (targetTile === '#') {
      // If the player hits a wall, the player can no longer move.
      return;
    }
  }
};

const movePlayerDown = (player: Player, col: string[], distance: number) => {
  for (let i = 0; i < distance; i++) {
    const withinBounds = player.y + 1 < col.length;
    const targetTile = withinBounds && col[player.y + 1];

    // Wrap to the top.
    if (!withinBounds || !targetTile || targetTile === ' ') {
      for (let j = 0; j < col.length; j++) {
        if (col[j] === '.') {
          player.y = j;
          break;
        } else if (col[j] === '#') {
          return;
        }
      }
    } else if (targetTile === '.') {
      // If the target tile is an open tile, move.
      player.y++;
    } else if (targetTile === '#') {
      // If the player hits a wall, the player can no longer move.
      return;
    }
  }
};

const movePlayer = (player: Player, board: Board, distance: number) => {
  switch (player.facing) {
    case 0:
      movePlayerRight(player, board[player.y], distance);
      return;
    case 1:
      movePlayerDown(
        player,
        board.map((i) => i[player.x]),
        distance
      );
      return;
    case 2:
      movePlayerLeft(player, board[player.y], distance);
      return;
    default:
      movePlayerUp(
        player,
        board.map((i) => i[player.x]),
        distance
      );
      return;
  }
};

export const day22p1 = (input: string) => {
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
run(() => day22p1(input)); // 106094
