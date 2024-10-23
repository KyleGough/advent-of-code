export const getLayers = (input: string, size: number): string[][] => {
  const layers: string[][] = [];

  for (let i = 0; i < input.length; i += size) {
    layers.push(input.slice(i, i + size).split(''));
  }

  return layers;
};
