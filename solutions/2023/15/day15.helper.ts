export const hashCode = (code: string): number => {
  let value = 0;

  for (let i = 0; i < code.length; i++) {
    value += code.charCodeAt(i);
    value *= 17;
    value %= 256;
  }

  return value;
};
