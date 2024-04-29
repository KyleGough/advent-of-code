import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import {
  operations,
  Operation,
  parseSample,
  performOperation,
  Sample,
} from './day16.helper';
import { matchNumbers } from '@utilities/string';

export const day16p2 = (input: string) => {
  const [samplesText, instructionText] = input.split('\n\n\n\n');
  const samples = samplesText.split('\n\n').map(parseSample);

  // Intialise map where every code is valid for every operation.
  const opMap: Record<string, Set<number>> = operations.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: new Set<number>([...Array(16).keys()]),
    }),
    {}
  );

  // Test each sample to eliminate opcode matchings.
  samples.forEach((sample) => testSample(sample, opMap));

  const instructions = instructionText.split('\n').map(matchNumbers);

  const codeOrder = getCodeOrder(opMap);

  let register = [0, 0, 0, 0];

  // Executes the test program.
  for (const instruction of instructions) {
    register = performOperation(codeOrder[instruction[0]], {
      a: instruction[1],
      b: instruction[2],
      c: instruction[3],
      before: register,
    });
  }

  return register[0];
};

/**
 * Tests the sample. All operations that are invalid are removed from the operation map.
 */
const testSample = (sample: Sample, opMap: Record<Operation, Set<number>>) => {
  operations.forEach((op) => {
    const result = performOperation(op, sample);
    if (result.join(',') !== sample.after.join(',')) {
      opMap[op].delete(sample.opcode);
    }
  });
};

/**
 * Gets the ordered mapping of op code to functions.
 */
const getCodeOrder = (opMap: Record<Operation, Set<number>>): Operation[] => {
  const matches: Record<string, number> = {};

  while (Object.keys(opMap).length) {
    const keys = Object.keys(opMap) as Operation[];
    for (const k of keys) {
      if (opMap[k].size === 1) {
        const code = opMap[k].values().next().value;
        matches[k] = code;
        delete opMap[k];
        for (const op of operations) {
          opMap[op]?.delete(code);
        }
      }
    }
  }

  const keys = Object.keys(matches) as Operation[];

  return keys.sort((a, b) =>
    matches[a] < matches[b] ? -1 : matches[b] < matches[a] ? 1 : 0
  );
};

const input = getPuzzle(__dirname).input;
run(() => day16p2(input)); // 472
