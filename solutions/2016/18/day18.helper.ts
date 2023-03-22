const trapSlices = ['^^.', '.^^', '^..', '..^'];

const getNextRow = (row: string): string => {
  const width = row.length - 2;
  let nextRow = '.';

  for (let i = 1; i <= width; i++) {
    const slice = row.slice(i - 1, i + 2);
    nextRow += trapSlices.includes(slice) ? '^' : '.';
  }

  nextRow += '.';
  return nextRow;
};

const countSafeTilesRow = (row: string): number => {
  return row.split('').filter((x) => x === '.').length - 2;
};

export const countSafeTiles = (input: string, rows: number): number => {
  let currRow = `.${input}.`;
  let rowCount = 1;
  let safeTileCount = countSafeTilesRow(currRow);

  while (rowCount < rows) {
    rowCount++;
    currRow = getNextRow(currRow);
    safeTileCount += countSafeTilesRow(currRow);
  }

  return safeTileCount;
};
