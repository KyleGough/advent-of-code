export const findNthSpoken = (startingNums: number[], n: number): number => {
  const speakRecord = new Array<number>(n);
  const initialSpoken = startingNums.length - 1;
  let turn = 0;

  for (let i = 0; i < initialSpoken; i++) {
    speakRecord[startingNums[i]] = i;
  }

  let previous = startingNums[initialSpoken];
  turn = initialSpoken;

  while (turn + 1 < n) {
    if (previous in speakRecord) {
      const previousTurn = speakRecord[previous];
      speakRecord[previous] = turn;
      previous = turn - previousTurn;
    } else {
      speakRecord[previous] = turn;
      previous = 0;
    }

    turn += 1;
  }

  return previous;
};
