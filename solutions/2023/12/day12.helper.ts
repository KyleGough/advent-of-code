export const parseRow = (input: string) => {
  const [springs, groups] = input.split(' ');

  return {
    springs,
    groups: groups.split(',').map((i) => parseInt(i)),
  };
};

const map = new Map();

export const combos = (
  spring: string,
  groups: number[],
  lastDamaged: boolean
): number => {
  const search = `${spring}-${groups.join(',')}-${lastDamaged}`;

  if (map.has(search)) {
    return map.get(search);
  }

  let count = 0;
  const next = spring.slice(1);

  // Base case
  if (spring.length === 0) {
    if (groups.length === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  switch (spring.charAt(0)) {
    case '.':
      count += combos(next, [...groups], false);
      break;
    case '#':
      if (groups.length === 0 || lastDamaged) {
        return 0;
      }
      const n = groups[0];
      const section = spring.slice(0, n);
      if (!section.includes('.') && section.length === n) {
        count += combos(spring.slice(n), groups.slice(1), true);
      }
      break;
    case '?':
    default:
      if (groups.length !== 0 && !lastDamaged) {
        const m = groups[0];
        const section = spring.slice(0, m);
        if (!section.includes('.') && section.length === m) {
          count += combos(spring.slice(m), groups.slice(1), true);
        }
      }
      count += combos(next, [...groups], false);
      break;
  }

  map.set(search, count);
  return count;
};
