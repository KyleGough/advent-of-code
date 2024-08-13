type Rules = Record<string, string>;

export const parseRules = (input: string): Rules => {
  const lines = input.split('\n');
  const rules: Rules = {};

  for (const line of lines) {
    const idMatch = line.match(/^\d+/);

    if (!idMatch) throw new Error('Unable to parse rule');

    const id = idMatch[0];

    if (line.includes('"')) {
      // Character rule.
      const charMatch = line.match(/"(.)"/);
      if (!charMatch) throw new Error('Unable to parse rule');
      rules[id] = charMatch[1];
    } else {
      // Substitution rule.
      const subArray = line.split(': ')[1].split(' | ');
      const wrappedNums = subArray.map(wrapNumbers).join('|');
      rules[id] = `(${wrappedNums})`;
    }
  }

  return rules;
};

const wrapNumbers = (input: string): string => {
  const nums = input.split(' ');
  return nums.map((n) => `[${n}]`).join('');
};

const getCompleteRules = (rules: Rules): string[] => {
  const completeRules: string[] = [];

  // Find initial single character rules.
  for (const id of Object.keys(rules)) {
    if (!rules[id].includes('[')) {
      completeRules.push(id);
    }
  }

  return completeRules;
};

export const convertToRegex = (rules: Rules): RegExp => {
  while (rules['0'].includes('[')) {
    const queue = getCompleteRules(rules);

    for (const replacementId of queue) {
      const value = rules[replacementId];
      for (const id of Object.keys(rules)) {
        rules[id] = rules[id].replaceAll(`[${replacementId}]`, value);
      }
      delete rules[replacementId];
    }
  }

  return new RegExp(`^${rules['0']}$`);
};
