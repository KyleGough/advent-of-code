export const processIgnores = (input: string): string => {
  let i = 0;
  const output = [];

  while (i < input.length) {
    if (input.charAt(i) === '!') {
      i += 2;
    } else {
      output.push(input.charAt(i));
      i++;
    }
  }

  return output.join('');
};
