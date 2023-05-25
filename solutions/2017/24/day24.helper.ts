type ComponentGraph = Record<string, string[]>;

export const buildComponents = (input: string): ComponentGraph => {
  const components: ComponentGraph = {};
  const lines = input.split('\n');

  for (const line of lines) {
    const [l, r] = line.split('/');
    if (Object.keys(components).includes(l)) {
      components[l].push(r);
    } else {
      components[l] = [r];
    }
    if (Object.keys(components).includes(r)) {
      components[r].push(l);
    } else {
      components[r] = [l];
    }
  }

  return components;
};

const cloneComponents = (components: ComponentGraph): ComponentGraph => {
  return { ...components };
};

export const branch = (
  current: string,
  components: ComponentGraph,
  comboScore = 0,
  length = 0
): [number, number][] => {
  const options = components[current];

  if (!options.length) {
    return [[comboScore, length]];
  }

  const scores: [number, number][] = [];

  for (const option of options) {
    const copyComp = cloneComponents(components);
    const idxCurrent = copyComp[current].indexOf(option);
    const idxOption = copyComp[option].indexOf(current);
    copyComp[current] = copyComp[current].filter((_, id) => id !== idxCurrent);
    copyComp[option] = copyComp[option].filter((_, id) => id !== idxOption);
    const result = branch(
      option,
      copyComp,
      comboScore + parseInt(option) + parseInt(current),
      length + 1
    );

    for (const score of result) {
      scores.push(score);
    }
  }

  return scores;
};
