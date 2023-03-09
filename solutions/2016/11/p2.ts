import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { parseFloors, assembleChips } from './day11.helper';

export const day11p2 = (input: string) => {
  const initialItems = parseFloors(input);
  initialItems[0].push(
    ...[
      'elerium generator',
      'elerium microchip',
      'dilithium generator',
      'dilithium microchip',
    ]
  );

  return assembleChips(initialItems);
};

const input = getPuzzle(__dirname).input;
run(() => day11p2(input)); // 55
