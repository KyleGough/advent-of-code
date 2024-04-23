import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getMaxPower, getSummedAreaTable } from './day11.helper';

export const day11p1 = (input: string) => {
  const serial = parseInt(input);
  const summedAreaTable = getSummedAreaTable(serial);
  const { coord } = getMaxPower(summedAreaTable, 3);
  return coord;
};

const input = getPuzzle(__dirname).input;
run(() => day11p1(input)); // 20,32
