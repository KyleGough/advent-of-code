import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { coordToString, getInitialBlackTiles, HexCoord } from './day24.helper';

export const day24p2 = (input: string) => {
  const directions = input.split('\n');
  let blackTiles = getInitialBlackTiles(directions);

  for (let i = 0; i < 100; i++) {
    blackTiles = processDay(blackTiles);
  }

  return blackTiles.size;
};

const convolutions = [
  { q: 1, r: -1, s: 0 },
  { q: 0, r: -1, s: 1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: -1, r: 0, s: 1 },
];

const stringToCoord = (input: string): HexCoord => {
  const coords = input.split(',').map(Number);
  return {
    q: coords[0],
    r: coords[1],
    s: coords[2],
  };
};

const getCheckTiles = (blackTiles: string[]): string[] => {
  const checkTiles = new Set<string>(blackTiles);

  for (const tileString of blackTiles) {
    const tile = stringToCoord(tileString);

    for (const c of convolutions) {
      const q = tile.q + c.q;
      const r = tile.r + c.r;
      const s = tile.s + c.s;
      checkTiles.add(coordToString({ q, r, s }));
    }
  }

  return [...checkTiles];
};

const processDay = (blackTiles: Set<string>): Set<string> => {
  const nextBlackTiles = new Set<string>();

  // Find adjacent neighbour tiles.
  const checkTiles = getCheckTiles([...blackTiles]);

  for (const tileString of checkTiles) {
    const tile = stringToCoord(tileString);
    let blackTileNeighbours = 0;
    // Count number of black tile neighbours.
    for (const c of convolutions) {
      const q = tile.q + c.q;
      const r = tile.r + c.r;
      const s = tile.s + c.s;
      const neighbour: HexCoord = { q, r, s };
      if (blackTiles.has(coordToString(neighbour))) {
        blackTileNeighbours += 1;
      }
    }

    if (
      blackTileNeighbours === 2 ||
      (blackTiles.has(tileString) && blackTileNeighbours === 1)
    ) {
      nextBlackTiles.add(tileString);
    }
  }

  return nextBlackTiles;
};

const input = getPuzzle(__dirname).input;
run(() => day24p2(input)); // 4135
