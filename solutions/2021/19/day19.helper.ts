import { matchNumbers } from '@utilities/string';
import { intersection, transpose } from '@utilities/array';
import { sum } from '@utilities/reduce';

export const parseScanner = (input: string): Scanner => {
  const beaconsRaw = input.split('\n');
  const id = matchNumbers(beaconsRaw[0])[0];
  const beacons = beaconsRaw
    .slice(1)
    .map(
      (b) => new Beacon(b.split(',').map(Number) as [number, number, number])
    );
  return new Scanner(id, beacons);
};

const getBeaconTranslations = (beacon: Beacon): Beacon[] => {
  const [x, y, z] = beacon._beacon;

  const translations: [number, number, number][] = [
    [x, y, z],
    [x, z, -y],
    [x, -y, -z],
    [x, -z, y],
    [-x, -y, z],
    [-x, z, y],
    [-x, y, -z],
    [-x, -z, -y],
    [y, z, x],
    [y, x, -z],
    [y, -z, -x],
    [y, -x, z],
    [-y, -z, x],
    [-y, x, z],
    [-y, z, -x],
    [-y, -x, -z],
    [z, x, y],
    [z, y, -x],
    [z, -x, -y],
    [z, -y, x],
    [-z, -x, y],
    [-z, y, x],
    [-z, x, -y],
    [-z, -y, -x],
  ];

  return translations.map((b) => new Beacon(b));
};

const getDistances = (beacons: Beacon[]): number[] => {
  const distances: number[] = [];

  for (let i = 0; i < beacons.length - 1; i++) {
    for (let j = i + 1; j < beacons.length; j++) {
      distances.push(beacons[i].distance(beacons[j]));
    }
  }

  return distances.sort((a, b) => a - b);
};

class Beacon {
  _beacon: [number, number, number];

  constructor(beacon: [number, number, number]) {
    this._beacon = beacon;
  }

  add(other: Beacon): Beacon {
    return new Beacon([
      this._beacon[0] + other._beacon[0],
      this._beacon[1] + other._beacon[1],
      this._beacon[2] + other._beacon[2],
    ]);
  }

  minus(other: Beacon): Beacon {
    return new Beacon([
      this._beacon[0] - other._beacon[0],
      this._beacon[1] - other._beacon[1],
      this._beacon[2] - other._beacon[2],
    ]);
  }

  distance(other: Beacon): number {
    return (
      Math.abs(this._beacon[0] - other._beacon[0]) +
      Math.abs(this._beacon[1] - other._beacon[1]) +
      Math.abs(this._beacon[2] - other._beacon[2])
    );
  }

  toString(): string {
    return this._beacon.join(',');
  }

  magnitude(): number {
    return this._beacon.map(Math.abs).reduce(sum, 0);
  }
}

export class Scanner {
  id: number;
  beacons: Beacon[];
  translations: Beacon[][];
  distances: number[];
  basis: number;
  offset: Beacon;
  located: boolean;

  constructor(id: number, beacons: Beacon[]) {
    this.id = id;
    this.beacons = beacons;
    this.translations = transpose(beacons.map(getBeaconTranslations));
    this.distances = getDistances(beacons);
    this.basis = 0;
    this.offset = new Beacon([0, 0, 0]);
    this.located = false;
  }

  isOverlap(other: Scanner): boolean {
    // Scanners overlap with at least 12 matching beacons corresponding to at least 12C2 matching distances.
    const overlap = intersection(this.distances, other.distances);
    return overlap.length >= 66;
  }

  findOverlap(other: Scanner): void {
    const fixedBeacons = this.translations[this.basis];
    const fixedBeaconStrings = fixedBeacons.map((b) => b.toString());

    for (let t = 0; t < 24; t++) {
      for (let x = 0; x < fixedBeacons.length; x++) {
        const beaconA = fixedBeacons[x];

        for (let y = 0; y < other.translations[t].length; y++) {
          const beaconB = other.translations[t][y];
          const offset = beaconA.minus(beaconB);

          const testBeacons = other.translations[t].map((b) => b.add(offset));
          const testBeaconStrings = testBeacons.map((b) => b.toString());

          const beaconIntersection = intersection(
            fixedBeaconStrings,
            testBeaconStrings
          );

          if (beaconIntersection.length >= 12) {
            const scannerOffset = this.offset.add(offset);
            other.offset = scannerOffset;
            other.basis = t;
            return;
          }
        }
      }
    }

    throw Error('Unable to find overlap between scanners');
  }
}

export const locateScanners = (scanners: Scanner[]): Scanner[] => {
  const queue: Scanner[] = [scanners[0]];
  const locatedScanners: Scanner[] = [];
  let unknownScanners: Scanner[] = scanners.slice(1);

  while (queue.length) {
    const scanner = queue.pop() as Scanner;
    for (const testScanner of unknownScanners) {
      if (scanner.isOverlap(testScanner)) {
        scanner.findOverlap(testScanner);
        queue.push(testScanner);
        testScanner.located = true;
      }
    }

    locatedScanners.push(scanner);
    unknownScanners = unknownScanners.filter((s) => !s.located);
  }

  return locatedScanners;
};
