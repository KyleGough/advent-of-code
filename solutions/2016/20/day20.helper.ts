export const parseIPRange = (input: string): [number, number] => {
  const rangeMatch = input.match(/(?<min>\d+)-(?<max>\d+)/)?.groups;

  if (!rangeMatch) throw new Error('Unable to parse IP range');

  return [parseInt(rangeMatch.min), parseInt(rangeMatch.max)];
};
