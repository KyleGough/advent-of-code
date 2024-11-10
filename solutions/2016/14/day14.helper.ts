import md5 from 'md5';

interface Patterns {
  triple?: string;
  quint: Set<string>;
}

const getPatterns = (input: string): Patterns => {
  const tripleMatch = input.match(/(\w)\1\1/);
  const quintMatch = input.matchAll(/(\w)\1\1\1\1/g);

  return {
    triple: tripleMatch ? tripleMatch[1] : undefined,
    quint: new Set([...quintMatch].map((i) => i[0])),
  };
};

const getHash = (input: string, repeat: number): string => {
  let output = input;

  for (let i = 0; i < repeat; i++) {
    output = md5(output);
  }

  return output;
};

const preHash = (
  input: string,
  count: number,
  hashCount: number
): Patterns[] => {
  const hashList = [];

  for (let i = 0; i < count; i++) {
    const hash = getHash(`${input}${i}`, hashCount);
    hashList.push(getPatterns(hash));
  }

  return hashList;
};

export const getPadKeyIndex = (
  input: string,
  keyIndex: number,
  hashCount: number
): number => {
  let foundKeys = 0;
  let hashIndex = 0;
  const hashList = preHash(input, 1000, hashCount);

  while (foundKeys < keyIndex) {
    const hash = getHash(`${input}${hashIndex + 1000}`, hashCount);
    hashList.push(getPatterns(hash));

    const triple = hashList[hashIndex].triple;

    if (triple) {
      for (let j = hashIndex + 1; j < hashIndex + 1000; j++) {
        if (hashList[j].quint.has(triple.repeat(5))) {
          foundKeys++;
        }
      }
    }

    hashIndex++;
  }

  return hashIndex - 1;
};
