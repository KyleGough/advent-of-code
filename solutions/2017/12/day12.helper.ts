type PipeNetwork = Record<number, number[]>;

export const parsePipeNetwork = (input: string): PipeNetwork => {
  const lines = input.split('\n');
  const pipes: Record<number, number[]> = {};

  for (const line of lines) {
    const [id, connections] = line.split(' <-> ');
    pipes[parseInt(id)] = connections.split(', ').map((i) => parseInt(i));
  }

  return pipes;
};

export const getGroup = (pipes: PipeNetwork, id: number): Set<number> => {
  const group = new Set([id, ...pipes[id]]);
  const checked = pipes[id];

  while (checked.length) {
    const checkItem = checked.pop() as number;

    for (let i = 0; i < pipes[checkItem].length; i++) {
      if (!group.has(pipes[checkItem][i])) {
        checked.push(pipes[checkItem][i]);
      }
    }

    group.add(checkItem);
  }

  return group;
};
