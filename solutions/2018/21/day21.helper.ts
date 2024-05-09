export const findOverflowCodes = () => {
  const codes: number[] = [];

  let c = 65536;
  let f = 10362650;

  while (true) {
    f = (((f + (c & 255)) & 16777215) * 65899) & 16777215;

    if (c >= 256) {
      c = Math.floor(c / 256);
    } else if (codes.includes(f)) {
      return codes;
    } else {
      codes.push(f);
      c = f | 65536;
      f = 10362650;
    }
  }
};
