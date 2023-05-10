import { modulo } from '@utilities/modulo';
import { max } from '@utilities/reduce';

export const parseLayers = (input: string): Record<number, number> => {
  const layers: Record<number, number> = {};

  for (const line of input.split('\n')) {
    const [layer, range] = line.split(': ');
    layers[parseInt(layer)] = parseInt(range);
  }

  return layers;
};

export const getSeverity = (layers: Record<number, number>): number => {
  let severity = 0;
  const maxLayer = Object.keys(layers)
    .map((i) => parseInt(i))
    .reduce(max, 0);

  for (let i = 0; i <= maxLayer; i++) {
    if (layers[i] && bounceModulo(i, layers[i]) === 0) {
      severity += i * layers[i];
    }
  }

  return severity;
};

export const bounceModulo = (n: number, m: number): number => {
  const mod = modulo(n, m + m - 2);
  return mod >= m ? m + m - n - 2 : mod;
};
