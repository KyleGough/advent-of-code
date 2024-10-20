import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { locateScanners, parseScanner, Scanner } from './day19.helper';

export const day19p1 = (input: string) => {
  const scanners = input.split('\n\n').map(parseScanner);
  const locatedScanners = locateScanners(scanners);
  return getAllBeacons(locatedScanners).size;
};

const getAllBeacons = (scanners: Scanner[]): Set<string> => {
  const allBeacons = new Set<string>();

  for (const scanner of scanners) {
    for (const beacon of scanner.translations[scanner.basis]) {
      allBeacons.add(beacon.add(scanner.offset).toString());
    }
  }

  return allBeacons;
};

const input = getPuzzle(__dirname).input;
run(() => day19p1(input)); // 326
