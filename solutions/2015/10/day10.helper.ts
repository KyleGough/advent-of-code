export const lookAndSay = (input: string): string => {
  const previous = input.split('');
  let currentValue = previous[0];
  let currentCount = 0;
  const current: string[] = [];

  for (let i = 0; i < previous.length; i++) {
    if (previous[i] !== currentValue) {
      current.push(currentCount.toString(), currentValue);
      currentCount = 1;
      currentValue = previous[i];
    } else {
      currentCount++;
    }
  }

  current.push(currentCount.toString(), currentValue);

  return current.join('');
};
