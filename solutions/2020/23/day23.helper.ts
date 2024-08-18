import { max, min } from '@utilities/reduce';

const parseCups = (values: number[]): Record<number, number> => {
  const cups: Record<number, number> = {};
  const start = values[0];
  let previous = start;

  for (const value of values.slice(1)) {
    cups[previous] = value;
    previous = value;
  }

  cups[previous] = start;
  return cups;
};

export const moveCups = (
  values: number[],
  moves: number
): Record<number, number> => {
  const cups = parseCups(values);
  const minValue = values.reduce(min, Number.MAX_SAFE_INTEGER);
  const maxValue = values.reduce(max, 0);

  let current = values[0];

  for (let i = 0; i < moves; i++) {
    const pick = cups[current];
    cups[current] = cups[cups[cups[pick]]];

    const pickValues = [pick, cups[pick], cups[cups[pick]]];
    let destination = current;

    do {
      destination -= 1;
      if (destination < minValue) {
        destination = maxValue;
      }
    } while (pickValues.includes(destination));

    cups[pickValues[2]] = cups[destination];
    cups[destination] = pick;
    current = cups[current];
  }

  return cups;
};
