type RawPair = [number | RawPair, number | RawPair];
type FlatPairs = [value: number, depth: number][];

class Pair {
  depth: number;
  left: Pair | number;
  right: Pair | number;

  constructor(depth: number, data: RawPair) {
    this.depth = depth;
    this.left = isNumber(data[0]) ? data[0] : new Pair(depth + 1, data[0]);
    this.right = isNumber(data[1]) ? data[1] : new Pair(depth + 1, data[1]);
  }

  getFlatValues(): FlatPairs {
    const values: FlatPairs = [];

    if (isNumber(this.left)) {
      values.push([this.left, this.depth]);
    } else {
      values.push(...this.left.getFlatValues());
    }

    if (isNumber(this.right)) {
      values.push([this.right, this.depth]);
    } else {
      values.push(...this.right.getFlatValues());
    }

    return values;
  }
}

const isNumber = (input: unknown): input is number => {
  return Number.isInteger(input);
};

export const parseFlatPairs = (input: string): FlatPairs => {
  return new Pair(0, JSON.parse(input)).getFlatValues();
};

const explode = (pairs: FlatPairs): FlatPairs => {
  // Finds pairs of matching depth of at least 4.
  for (let i = 0; i < pairs.length - 1; i++) {
    const [value, depth] = pairs[i];
    const [value2, depth2] = pairs[i + 1];

    if (depth >= 4 && depth === depth2) {
      if (i > 0) {
        pairs[i - 1][0] += value;
      }

      if (i + 2 < pairs.length) {
        pairs[i + 2][0] += value2;
      }

      return [
        ...(i > 0 ? pairs.slice(0, i) : []),
        [0, depth - 1],
        ...pairs.slice(i + 2),
      ];
    }
  }

  return pairs;
};

const split = (pairs: FlatPairs): FlatPairs => {
  for (let i = 0; i < pairs.length; i++) {
    const [value, depth] = pairs[i];
    if (value >= 10) {
      return [
        ...(i > 0 ? pairs.slice(0, i) : []),
        [Math.floor(value / 2), depth + 1],
        [Math.ceil(value / 2), depth + 1],
        ...pairs.slice(i + 1),
      ];
    }
  }

  return pairs;
};

const reducePairs = (pairs: FlatPairs): FlatPairs => {
  let complete = false;

  while (!complete) {
    const preExplodeLength = pairs.length;
    pairs = explode(pairs);
    if (preExplodeLength !== pairs.length) {
      continue;
    }

    const preSplitLength = pairs.length;
    pairs = split(pairs);
    if (preSplitLength !== pairs.length) {
      continue;
    }

    complete = true;
  }

  return pairs;
};

export const addPairs = (pairA: FlatPairs, pairB: FlatPairs): FlatPairs => {
  return reducePairs(
    pairA.concat(pairB).map(([value, depth]) => [value, depth + 1])
  );
};

const reduceMagnitude = (pairs: FlatPairs): FlatPairs => {
  for (let i = 0; i < pairs.length - 1; i++) {
    if (pairs[i][1] === pairs[i + 1][1]) {
      const leftValue = 3 * pairs[i][0];
      const rightValue = 2 * pairs[i + 1][0];
      const value = leftValue + rightValue;

      return [
        ...(i > 0 ? pairs.slice(0, i) : []),
        [value, pairs[i][1] - 1],
        ...pairs.slice(i + 2),
      ];
    }
  }

  return pairs;
};

export const getMagnitude = (pairs: FlatPairs): number => {
  while (pairs.length > 1) {
    pairs = reduceMagnitude(pairs);
  }

  return pairs[0][0];
};
