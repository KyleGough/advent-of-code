import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseTile, Grid, Tile } from './day20.helper';

export const day20p2 = (input: string) => {
  const tiles = input.split('\n\n').map(parseTile);
  const borderIds = tiles.map((t) => t.borderIds).flat();
  tiles.forEach((tile) => tile.enrichTile(borderIds));

  const tileMap: Record<number, Tile> = tiles.reduce(
    (prev, curr) => ({ ...prev, [curr.id]: curr }),
    {}
  );

  const tileGrid: Tile[][] = [];

  // Find and transform first corner into top-left piece.
  const firstCorner = tiles.find((tile) => tile.type === 'CORNER');

  if (!firstCorner) {
    throw new Error('No corner pieces detected');
  }

  while (firstCorner.matchCounts.join(',') !== [1, 2, 2, 1].join(',')) {
    firstCorner.rotateCW();
  }

  const row = constructTileRow(tileMap, firstCorner);
  tileGrid.push(row);

  while (Object.keys(tileMap).length) {
    const previousTile = tileGrid[tileGrid.length - 1][0];
    const bottomBorderId = previousTile.borderIds[2];
    const bottomBorder = previousTile.grid.getBottomBorder();
    const firstTile = Object.values(tileMap).find((tile) =>
      tile.borderIds.includes(bottomBorderId)
    ) as Tile;

    while (firstTile.grid.getTopBorder() !== bottomBorder) {
      firstTile.transform();
    }

    const row = constructTileRow(tileMap, firstTile);
    tileGrid.push(row);
  }

  const croppedGrid = getCroppedGrid(tileGrid);
  let seaMonsterCount = countSeaMonsters(croppedGrid);

  while (!seaMonsterCount) {
    croppedGrid.transform();
    seaMonsterCount = countSeaMonsters(croppedGrid);
  }

  const hashCount = croppedGrid.countCells('#');
  return hashCount - 15 * seaMonsterCount;
};

const convolutions = [
  { x: 18, y: 0 },
  { x: 0, y: 1 },
  { x: 5, y: 1 },
  { x: 6, y: 1 },
  { x: 11, y: 1 },
  { x: 12, y: 1 },
  { x: 17, y: 1 },
  { x: 18, y: 1 },
  { x: 19, y: 1 },
  { x: 1, y: 2 },
  { x: 4, y: 2 },
  { x: 7, y: 2 },
  { x: 10, y: 2 },
  { x: 13, y: 2 },
  { x: 16, y: 2 },
];

const getMatchingTile = (
  borderId: number,
  tileMap: Record<number, Tile>
): Tile => {
  return Object.values(tileMap).filter((tile) =>
    tile.borderIds.includes(borderId)
  )[0];
};

const constructTileRow = (
  tileMap: Record<number, Tile>,
  initialTile: Tile
): Tile[] => {
  const tileRow = [initialTile];
  delete tileMap[initialTile.id];
  let currentTile = initialTile;

  do {
    const rightBorderId = currentTile.borderIds[1];
    const rightBorder = currentTile.grid.getRightBorder();
    const nextTile = getMatchingTile(rightBorderId, tileMap);

    while (nextTile.grid.getLeftBorder() !== rightBorder) {
      nextTile.transform();
    }

    tileRow.push(nextTile);
    delete tileMap[nextTile.id];
    currentTile = nextTile;
  } while (currentTile.matchCounts[1] !== 1);

  return tileRow;
};

const getCroppedGrid = (tileGrid: Tile[][]): Grid => {
  const croppedGrid: string[][] = [];
  for (const row of tileGrid) {
    for (let y = 1; y <= 8; y++) {
      const croppedRow: string[] = [];
      for (const tile of row) {
        croppedRow.push(...tile.grid.grid[y].slice(1, -1));
      }
      croppedGrid.push(croppedRow);
    }
  }

  return new Grid(croppedGrid);
};

const countSeaMonsters = (croppedGrid: Grid) => {
  const grid = croppedGrid.grid;
  const width = grid[0].length;
  const height = grid.length;
  let count = 0;

  for (let y = 0; y < height - 2; y++) {
    for (let x = 0; x < width - 19; x++) {
      let found = true;
      for (const c of convolutions) {
        if (grid[y + c.y][x + c.x] !== '#') {
          found = false;
          break;
        }
      }
      if (found) {
        count += 1;
      }
    }
  }

  return count;
};

const input = getPuzzle(__dirname).input;
run(() => day20p2(input)); // 2424
