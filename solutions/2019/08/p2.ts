import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { getLayers } from './day08.helper';

export const day08p2 = (input: string) => {
  const width = 25;
  const height = 6;
  const layerSize = width * height;
  const layers = getLayers(input, layerSize);

  const flatImage: string[] = [];

  for (let i = 0; i < layerSize; i++) {
    let layer = 0;

    while (layers[layer][i] === '2') {
      layer += 1;
    }

    flatImage.push(layers[layer][i] === '0' ? '.' : '#');
  }

  const image = getLayers(flatImage.join(''), width);
  return image.map((p) => p.join('')).join('\n');
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // CJZLP
