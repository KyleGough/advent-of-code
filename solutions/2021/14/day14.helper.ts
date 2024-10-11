export const parseRules = (input: string): Record<string, string> => {
  const rules: Record<string, string> = {};
  const lines = input.split('\n');

  for (const rule of lines) {
    const [x, y] = rule.split(' -> ');
    rules[x] = y;
  }

  return rules;
};
