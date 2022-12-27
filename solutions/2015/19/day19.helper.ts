const insertAt = (arr: string, index: number, value: string): string[] => [
  ...arr.slice(0, index),
  value,
  ...arr.slice(index),
];

export const replacementStep = (
  molecule: string,
  replacementList: string[][]
): string[] => {
  const newMolecules = new Set<string>();

  for (let i = 0; i < replacementList.length; i++) {
    const [match, replace] = replacementList[i];
    const matchLength = match.length;
    const matchRegex = new RegExp(`${match}`, 'g');
    const matches = molecule.matchAll(matchRegex);

    if (replace === 'e' && match !== molecule) {
      continue;
    }

    let result = matches.next();
    while (!result.done) {
      const idx = result.value.index ?? 0;

      const sliced = [
        ...molecule.slice(0, idx),
        ...molecule.slice(idx + matchLength),
      ].join('');

      const replacedMolecule = insertAt(sliced, idx, replace).join('');
      newMolecules.add(replacedMolecule);

      result = matches.next();
    }
  }

  return [...newMolecules];
};
