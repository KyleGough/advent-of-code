const parseRule = (input: string): Record<string, number[][]> => {
  const [field, ranges] = input.split(': ');
  return {
    [field]: ranges.split(' or ').map((r) => r.split('-').map(Number)),
  };
};

const csvToNumArray = (input: string): number[] => {
  return input.split(',').map(Number);
};

export const parseInput = (input: string) => {
  const sections = input.split('\n\n');
  const rules = sections[0]
    .split('\n')
    .map(parseRule)
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  const ownTicket = csvToNumArray(sections[1].split('\n')[1]);
  const tickets = sections[2].split('\n').slice(1).map(csvToNumArray);

  return {
    rules,
    ownTicket,
    tickets,
  };
};

export const isTicketValueValid = (
  ticket: number,
  rules: number[][]
): boolean => {
  for (const [min, max] of rules) {
    if (ticket >= min && ticket <= max) {
      return true;
    }
  }

  return false;
};
