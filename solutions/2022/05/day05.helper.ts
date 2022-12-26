export const getStartingStacks = (stacks: string): string[] => {
  const lines = stacks.split('\n');
  const stackCounts = lines[lines.length - 1].split('   ');
  const maxStackCount = parseInt(stackCounts[stackCounts.length - 1]);
  const startingStacks = [];

  for (let i = 0; i < maxStackCount; i++) {
    const crateColumn = lines.slice(0, -1).map((row) => row[1 + 4 * i]);
    const validCrateColumn = crateColumn.filter((i) => i && i !== ' ');
    startingStacks.push(validCrateColumn.reverse().join(''));
  }

  return startingStacks;
};
