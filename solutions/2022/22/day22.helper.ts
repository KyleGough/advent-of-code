export type Board = string[][];

export interface Player {
  x: number;
  y: number;
  facing: number;
}

const modulo = (n: number, m: number): number => ((n % m) + m) % m;

export const initialPosition = (board: Board): Player => ({
  x: board[0].findIndex((tile) => tile === '.'),
  y: 0,
  facing: 0,
});

export const turnPlayer = (player: Player, direction: string) => {
  if (direction === 'R') {
    player.facing = modulo(player.facing + 1, 4);
  } else {
    player.facing = modulo(player.facing - 1, 4);
  }
};

export const getPassword = (player: Player): number =>
  1000 * (player.y + 1) + 4 * (player.x + 1) + player.facing;
