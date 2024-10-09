import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { sum } from '@utilities/reduce';
import { ReversibleMap } from '@utilities/reversibleMap';
import { parseDisplay } from './day08.helper';

export const day08p2 = (input: string) => {
  const lines = input.split('\n').map(parseDisplay);
  const displays = lines.map((line) => getDisplayValue(line[0], line[1]));
  return displays.reduce(sum, 0);
};

const signalContains = (signal: string, check: string): boolean => {
  for (const char of check) {
    if (!signal.includes(char)) {
      return false;
    }
  }

  return true;
};

const getDisplayValue = (signals: string[], output: string[]): number => {
  const config = new ReversibleMap<number, string>();

  // Find unique length numbers.
  config.set(1, signals[0]);
  config.set(7, signals[1]);
  config.set(4, signals[2]);
  config.set(8, signals[9]);

  const signalsLen5 = signals.slice(3, 6);
  const signalsLen6 = signals.slice(6, 9);

  const signalThree = signalsLen5.find((s) => signalContains(s, config.get(1)));
  const signalSix = signalsLen6.find((s) => !signalContains(s, config.get(1)));
  const signalNine = signalsLen6.find((s) => signalContains(s, config.get(4)));

  config.set(3, signalThree as string);
  config.set(6, signalSix as string);
  config.set(9, signalNine as string);

  const signalZero = signalsLen6.find(
    (s) => s !== signalSix && s !== signalNine
  );
  config.set(0, signalZero as string);

  const signalFive = signalsLen5.find((s) => signalContains(config.get(6), s));
  config.set(5, signalFive as string);

  const signalTwo = signalsLen5.find(
    (s) => s !== signalFive && s !== signalThree
  );
  config.set(2, signalTwo as string);

  const display = output.map((o) => config.reverseGet(o));
  return parseInt(display.join(''));
};

const input = getPuzzle(__dirname).input;
run(() => day08p2(input)); // 994266
