import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseLayers, bounceModulo } from './day13.helper';

const isCaught = (
  layers: Record<number, number>,
  layerKeys: number[],
  delay = 0
): boolean => {
  for (const i of layerKeys) {
    if (bounceModulo(i + delay, layers[i]) === 0) {
      return true;
    }
  }
  return false;
};

export const day13p2 = (input: string) => {
  const layers = parseLayers(input);
  const layerKeys = Object.keys(layers).map((l) => parseInt(l));
  let delay = 0;

  do {
    delay++;
  } while (isCaught(layers, layerKeys, delay));

  return delay;
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 3907994
