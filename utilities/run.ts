export const run = async (solutionFn: () => unknown) => {
  const runPath = process.argv[1].split('/');

  if (!runPath.includes('solutions')) return;

  const [year, day, part] = runPath.splice(-3);
  const runName = `${year}/day${day}/part${part[1]}`;
  console.time(runName);
  const output = await solutionFn();
  console.timeEnd(runName);
  console.log(output);
};
