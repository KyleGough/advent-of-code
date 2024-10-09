export const parseDisplay = (input: string): string[][] => {
  const [signals, output] = input.split(' | ').map((s) => s.split(' '));
  const sortedSignals = signals.sort((a, b) => a.length - b.length);
  return [sortedSignals.map(sortSignal), output.map(sortSignal)];
};

const sortSignal = (signal: string): string => {
  return signal.split('').sort().join('');
};
