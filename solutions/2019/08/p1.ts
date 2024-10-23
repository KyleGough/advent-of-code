import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getLayers } from './day08.helper';

export const day08p1 = (input: string) => {
  const width = 25;
  const height = 6;
  const layerSize = width * height;
  const layers = getLayers(input, layerSize);

  let minZeroCount = Number.MAX_SAFE_INTEGER;
  let minLayer: string[] = [];

  for (const layer of layers) {
    const zeroCount = countDigit(layer, '0');
    if (zeroCount < minZeroCount) {
      minZeroCount = zeroCount;
      minLayer = layer;
    }
  }

  return countDigit(minLayer, '1') * countDigit(minLayer, '2');
};

const countDigit = (layer: string[], digit: string): number => {
  return layer.filter((x) => x === digit).length;
};

const input = getPuzzle(__dirname).input;
run(() => day08p1(input)); // 2286
