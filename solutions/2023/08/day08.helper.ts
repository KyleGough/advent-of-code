type Network = Record<string, [string, string]>;

export const parseNetwork = (input: string): Network => {
  return input
    .split('\n')
    .map(parseNode)
    .reduce((prev, curr) => {
      const [source, left, right] = curr;
      return {
        ...prev,
        [source]: [left, right],
      };
    }, {});
};

const parseNode = (input: string): string[] => {
  const source = input.match(/^([0-9A-Z]{3})/);
  const left = input.match(/\(([0-9A-Z]{3})/);
  const right = input.match(/([0-9A-Z]{3})\)/);

  if (!source || !left || !right) {
    throw new Error('Unable to parse node');
  }

  return [source, left, right].map((i) => i[1]);
};
