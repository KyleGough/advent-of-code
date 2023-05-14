const spin = (dancers: string[], x: number): string[] => {
  return [...dancers.slice(-x), ...dancers.slice(0, -x)];
};

const exchange = (dancers: string[], a: number, b: number): string[] => {
  const tmp = dancers[a];
  dancers[a] = dancers[b];
  dancers[b] = tmp;
  return dancers;
};

const partner = (dancers: string[], a: string, b: string): string[] => {
  return dancers.map((i) => (i === a ? b : i === b ? a : i));
};

const getPositions = (move: string): [string, string] => {
  const positions = move.slice(1).split('/');
  return [positions[0], positions[1]];
};

export const dance = (moves: string[], dancers: string[]): string[] => {
  for (const move of moves) {
    switch (move.charAt(0)) {
      case 's':
        dancers = spin(dancers, parseInt(move.slice(1)));
        break;
      case 'x':
        const [a, b] = getPositions(move);
        dancers = exchange(dancers, parseInt(a), parseInt(b));
        break;
      case 'p':
        dancers = partner(dancers, ...getPositions(move));
        break;
    }
  }

  return dancers;
};
