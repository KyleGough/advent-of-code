import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { hashCode } from './day15.helper';

interface Lens {
  focalLength: number;
  label: string;
}

export const day15p2 = (input: string) => {
  const codes = input.split(',');
  const hashMap = hashmapProcedure(codes);
  return getFocusingPower(hashMap);
};

const hashmapProcedure = (codes: string[]): Record<number, Lens[]> => {
  const hashMap: Record<number, Lens[]> = {};

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    let hash;

    if (code.includes('=')) {
      const [label, focalLength] = code.split('=');
      const newLens = { focalLength: parseInt(focalLength), label };
      hash = hashCode(label);

      if (hashMap[hash]) {
        const existingIndex = hashMap[hash].findIndex(
          (lens) => lens.label === label
        );
        if (existingIndex > -1) {
          // Replace lens in existing box.
          hashMap[hash][existingIndex] = newLens;
        } else {
          // Add lens to existing box.
          hashMap[hash].push(newLens);
        }
      } else {
        // Add lens to new box.
        hashMap[hash] = [newLens];
      }
    } else {
      // Remove lens if it exists with label.
      const label = code.slice(0, -1);
      hash = hashCode(label);
      if (hashMap[hash]) {
        hashMap[hash] = hashMap[hash].filter((lens) => lens.label !== label);
      }
    }
  }

  return hashMap;
};

const getFocusingPower = (hashMap: Record<number, Lens[]>): number => {
  let power = 0;

  for (const [box, lenses] of Object.entries(hashMap)) {
    const boxValue = parseInt(box) + 1;

    for (let i = 0; i < lenses.length; i++) {
      const slotValue = i + 1;
      power += boxValue * slotValue * lenses[i].focalLength;
    }
  }

  return power;
};

const input = getPuzzle(__dirname).input;
run(() => day15p2(input)); // 243747
