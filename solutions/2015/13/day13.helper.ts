type ArrangementMap = Record<string, Record<string, number>>;

interface Arrangement {
  personA: string;
  personB: string;
  happiness: number;
}

const parseArrangement = (input: string): Arrangement => {
  const matches = input.match(
    /(?<personA>.+) would (?<temperment>.+) (?<value>\d+) happiness units by sitting next to (?<personB>.+)./
  )?.groups;

  if (!matches) throw new Error('Unable to parse input.');

  const { personA, temperment, value, personB } = matches;
  let happiness = parseInt(value);

  if (temperment === 'lose') {
    happiness *= -1;
  }

  return { personA, personB, happiness };
};

const getArrangementHappiness = (
  arrangements: ArrangementMap,
  personA: string,
  personB: string
): number => arrangements[personA][personB] + arrangements[personB][personA];

export const getPermutationHappiness = (
  arrangements: ArrangementMap,
  person: string[]
): number => {
  let totalHappiness = 0;
  person.push(person[0]);

  for (let i = 0; i < person.length - 1; i++) {
    totalHappiness += getArrangementHappiness(
      arrangements,
      person[i],
      person[i + 1]
    );
  }

  return totalHappiness;
};

export const getArrangementMap = (input: string): ArrangementMap => {
  const arrangements = input.split('\n').map(parseArrangement);

  const arrangementMap: ArrangementMap = {};

  for (let i = 0; i < arrangements.length; i++) {
    const { personA, personB, happiness } = arrangements[i];

    if (!(personA in arrangementMap)) {
      arrangementMap[personA] = {};
    }

    arrangementMap[personA][personB] = happiness;
  }

  return arrangementMap;
};
