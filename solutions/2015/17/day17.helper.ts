export const getCombinationCount = (containers: number[], capacity: number) => {
  let count = 0;
  const sizes: number[] = [];

  const containerCombos = (
    total: number,
    containerCount: number,
    remaining: number[]
  ) => {
    for (let i = 0; i < remaining.length; i++) {
      if (total + remaining[i] < capacity) {
        containerCombos(
          total + remaining[i],
          containerCount + 1,
          remaining.slice(i + 1)
        );
      } else if (total + remaining[i] === capacity) {
        count++;
        sizes.push(containerCount + 1);
      }
    }
  };

  containerCombos(0, 0, containers);

  const minSize = sizes.reduce(
    (prev, curr) => Math.min(prev, curr),
    Number.MAX_VALUE
  );
  const numMinSize = sizes.filter((i) => i === minSize).length;

  return {
    count,
    numMinSize,
  };
};
