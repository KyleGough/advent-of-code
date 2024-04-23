import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getMaxPower, getSummedAreaTable } from './day11.helper';

export const day11p2 = (input: string) => {
  const serial = parseInt(input);
  const summedAreaTable = getSummedAreaTable(serial);

  let maxPower = 0;
  let maxCoord = '';
  let maxConvolutionSize = 3;

  for (let convolutionSize = 3; convolutionSize <= 300; convolutionSize++) {
    const { power, coord } = getMaxPower(summedAreaTable, convolutionSize);
    if (power > maxPower) {
      maxCoord = coord;
      maxPower = power;
      maxConvolutionSize = convolutionSize;
    }
  }

  return `${maxCoord},${maxConvolutionSize}`;
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 235,287,13
