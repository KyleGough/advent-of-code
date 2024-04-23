interface PowerConvolution {
  power: number;
  coord: string;
}

const getPowerLevel = (serial: number, x: number, y: number): number => {
  const rackID = x + 10;
  let power = (rackID * y + serial) * rackID;
  power = power < 100 ? 0 : parseInt(power.toString().split('').reverse()[2]);
  power -= 5;
  return power;
};

const getPowerLevels = (serial: number): number[][] => {
  const powerLevels = [];
  for (let y = 0; y < 300; y++) {
    const row = [];
    for (let x = 0; x < 300; x++) {
      row.push(getPowerLevel(serial, x + 1, y + 1));
    }
    powerLevels.push(row);
  }

  return powerLevels;
};

export const getMaxPower = (
  table: number[][],
  convolutionSize: number
): PowerConvolution => {
  let maxPower = 0;
  let coord = '';

  for (let y = 0; y < 300 - convolutionSize; y++) {
    for (let x = 0; x < 300 - convolutionSize; x++) {
      const d = table[y + convolutionSize][x + convolutionSize];
      const c = table[y + convolutionSize][x];
      const b = table[y][x + convolutionSize];
      const a = table[y][x];
      const power = a + d - b - c;
      if (power > maxPower) {
        maxPower = power;
        coord = `${x + 2},${y + 2}`;
      }
    }
  }

  return { power: maxPower, coord };
};

export const getSummedAreaTable = (serial: number): number[][] => {
  const powerLevels = getPowerLevels(serial);

  // Generate first row.
  const firstRow = [];
  let value = 0;
  for (let x = 0; x < 300; x++) {
    value += powerLevels[0][x];
    firstRow.push(value);
  }

  const table: number[][] = [firstRow];

  for (let y = 1; y < 300; y++) {
    table.push([]);
    for (let x = 0; x < 300; x++) {
      const a = powerLevels[y][x];
      const b = table[y - 1][x];
      const c = table[y]?.[x - 1] ?? 0;
      const d = table[y - 1][x - 1] ?? 0;
      const area = a + b + c - d;
      table[y].push(area);
    }
  }

  return table;
};
