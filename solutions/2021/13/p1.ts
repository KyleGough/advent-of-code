import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  parseCoord,
  parseFold,
  performFold,
  coordToString,
} from './day13.helper';

export const day13p1 = (input: string) => {
  const [coordData, foldData] = input.split('\n\n');
  const coords = coordData.split('\n').map(parseCoord);
  const fold = parseFold(foldData.split('\n')[0]);
  const foldedCoords = coords.map((c) => performFold(c, fold));
  return new Set<string>(foldedCoords.map(coordToString)).size;
};

const input = getPuzzle(__dirname).input;
run(() => day13p1(input)); // TODO
