export const parseGenerators = (input: string) => {
  return input.split('\n').map((gen) => parseInt(gen.match(/\d+/)?.[0] ?? ''));
};

export function* generator(initialValue: number, factor: number, multiple = 1) {
  let value = initialValue;

  while (true) {
    value = (value * factor) % 2147483647;

    if (value % multiple === 0) {
      yield value.toString(2).slice(-16);
    }
  }
}
