export const countDigits = (digits: string[]): [number, number] => {
  let zeroCount = 0;
  let oneCount = 0;

  for (const digit of digits) {
    if (digit === '0') {
      zeroCount += 1;
    } else {
      oneCount += 1;
    }
  }

  return [zeroCount, oneCount];
};
