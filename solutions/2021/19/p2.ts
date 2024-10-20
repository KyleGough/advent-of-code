import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { locateScanners, parseScanner } from './day19.helper';

export const day19p2 = (input: string) => {
  const scanners = locateScanners(input.split('\n\n').map(parseScanner));

  let maxDistance = 0;

  for (let i = 0; i < scanners.length - 1; i++) {
    const offsetA = scanners[i].offset;

    for (let j = i + 1; j < scanners.length; j++) {
      const offsetB = scanners[j].offset;
      const distance = offsetA.minus(offsetB).magnitude();
      if (distance > maxDistance) {
        maxDistance = distance;
      }
    }
  }

  return maxDistance;
};

const input = getPuzzle(__dirname).input;
run(() => day19p2(input)); // 10630
