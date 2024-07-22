interface BagContent {
  amount: number;
  bag: string;
}

export interface Rule {
  container: string;
  contents: BagContent[];
  totalAmount: number;
}

const parseBagContent = (input: string): BagContent | undefined => {
  const matches = input.match(/(?<amount>\d+) (?<bag>.*) bags?/)?.groups;

  if (!matches) return;

  return {
    amount: parseInt(matches['amount']),
    bag: matches['bag'],
  };
};

const parseRule = (input: string): Rule => {
  const containerMatch = input.match(/^(.*) bags contain/);

  if (!containerMatch) {
    throw new Error('Unable to parse rule');
  }

  const contents = input.split('contain')[1].split(',');
  const contentsMatch = contents
    .map(parseBagContent)
    .filter(Boolean) as BagContent[];

  return {
    container: containerMatch[1],
    contents: contentsMatch,
    totalAmount: 0,
  };
};

export const parseRules = (input: string): Record<string, Rule> =>
  input
    .split('\n')
    .map(parseRule)
    .reduce((prev, curr) => ({ ...prev, [curr.container]: curr }), {});
