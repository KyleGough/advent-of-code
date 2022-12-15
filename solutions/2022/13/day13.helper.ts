type RecursiveList = number[] | RecursiveList[];

export const compareList = (
  leftList: RecursiveList,
  rightList: RecursiveList
): number => {
  const leftSize = leftList.length;
  const rightSize = rightList.length;

  for (let i = 0; i < Math.min(leftSize, rightSize); i++) {
    const left = leftList[i];
    const right = rightList[i];
    const isLeftNum = typeof left === 'number';
    const isRightNum = typeof right === 'number';

    let comparison = 0;

    if (isLeftNum && isRightNum) {
      if (left < right) {
        return -1;
      } else if (left > right) {
        return 1;
      }
      continue;
    } else if (isLeftNum && !isRightNum) {
      comparison = compareList([left], right);
    } else if (!isLeftNum && isRightNum) {
      comparison = compareList(left, [right]);
    } else if (!isLeftNum && !isRightNum) {
      comparison = compareList(left, right);
    }

    if (comparison === 1) {
      return 1;
    } else if (comparison === -1) {
      return -1;
    }
  }

  // Compare list lengths.
  if (leftSize < rightSize) {
    return -1;
  } else if (leftSize > rightSize) {
    return 1;
  } else {
    return 0;
  }
};
