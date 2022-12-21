export type MonkeyMap = Record<string, number | string[]>;

export const parseMonkey = (input: string): [string, number | string[]] => {
  const [name, formula] = input.split(': ');
  const job = formula.split(' ');

  if (job.length === 1) {
    return [name, parseInt(formula)];
  } else {
    return [name, job];
  }
};

export const getValue = (map: MonkeyMap, index: string): number => {
  const value = map[index];

  if (typeof value === 'number') return value;

  const [operandA, operator, operandB] = value;

  const left = getValue(map, operandA);
  const right = getValue(map, operandB);

  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    default:
      return left / right;
  }
};
