import { combinations } from '@utilities/combinations';

interface Stack {
  items: string[][];
  floor: number;
  step: number;
  previous: Stack | undefined;
}

export const parseFloors = (input: string): string[][] => {
  const floors = input.split('\n');
  const items: string[][] = [];

  for (let i = 0; i < floors.length; i++) {
    const itemMatches = floors[i].matchAll(
      /(\w+)(?:-compatible)? (generator|microchip)/g
    );
    items.push([...itemMatches].map((i) => i.slice(1, 3).join(' ')));
  }

  return items;
};

const isValidConfig = (input: string[]): boolean => {
  const items = input.map((i) => i.split(' '));
  const generatorCount = items.filter((i) => i[1] === 'generator').length;
  const microchipCount = items.length - generatorCount;

  if (generatorCount === 0 || microchipCount === 0) return true;
  if (microchipCount > generatorCount) return false;

  for (let i = 0; i < items.length; i++) {
    if (
      items[i][1] === 'microchip' &&
      !input.includes([items[i][0], 'generator'].join(' '))
    ) {
      return false;
    }
  }

  return true;
};

const getItemFloor = (items: string[][], item: string): number => {
  for (let f = 0; f <= 3; f++) {
    if (items[f].includes(item)) {
      return f;
    }
  }
  return -1;
};

const getHash = (
  items: string[][],
  chipTypes: string[],
  floor: number
): string => {
  const hash: string[] = [];

  for (let i = 0; i < chipTypes.length; i++) {
    const microchipFloor = getItemFloor(
      items,
      [chipTypes[i], 'microchip'].join(' ')
    );
    const generatorFloor = getItemFloor(
      items,
      [chipTypes[i], 'generator'].join(' ')
    );
    hash.push([microchipFloor.toString(), generatorFloor.toString()].join(''));
  }

  hash.sort();

  return hash.join('-') + '_f' + floor.toString();
};

export const assembleChips = (initialItems: string[][]): number => {
  const itemList = initialItems.reduce((prev, curr) => prev.concat(curr), []);
  const chipTypes = [...new Set([...itemList.map((i) => i.split(' ')[0])])];
  const stack: Stack[] = [
    { items: initialItems, floor: 0, step: 0, previous: undefined },
  ];
  let minStep = Number.MAX_VALUE;
  const seen: Record<string, number> = {};

  while (stack.length) {
    const stackItem = stack.pop() as Stack;
    const { items, floor, step } = stackItem;

    // Step length too long.
    if (step > minStep) {
      continue;
    }

    // Success state.
    if (step < minStep && items[3].length === itemList.length) {
      minStep = step;
      continue;
    }

    // Previous state check.
    const hash = getHash(items, chipTypes, floor);
    if (seen[hash] && seen[hash] <= step) {
      continue;
    }

    // Mark current item hash as seen.
    seen[hash] = step;

    const currentItems = items[floor];
    const itemCombinations = [...combinations(currentItems, 1, 3)].filter(
      (i) => i.length <= 2
    );

    // Identifies which floors can be moved to. Don't move to an empty lower floor, or the same floor.
    let nextFloors = [floor - 1, floor + 1].filter((f) => f >= 0 && f <= 3);
    for (let i = 0; i < 3; i++) {
      if (items[i].length === 0) {
        nextFloors = nextFloors.filter((f) => f !== i);
      } else {
        break;
      }
    }

    nextFloors.forEach((nextFloor) => {
      for (let j = 0; j < itemCombinations.length; j++) {
        const nextItems = [
          [...items[0]],
          [...items[1]],
          [...items[2]],
          [...items[3]],
        ];
        nextItems[floor] = nextItems[floor].filter(
          (item) => !itemCombinations[j].includes(item)
        );
        nextItems[nextFloor].push(...itemCombinations[j]);
        if (
          isValidConfig(nextItems[floor]) &&
          isValidConfig(nextItems[nextFloor])
        ) {
          stack.unshift({
            items: nextItems,
            floor: nextFloor,
            step: step + 1,
            previous: stackItem,
          });
        }
      }
    });
  }

  return minStep;
};
