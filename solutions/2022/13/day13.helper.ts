export const compareList = (leftList: any, rightList: any): number => {
  const leftSize = leftList.length;
  const rightSize = rightList.length;

  for (let i = 0; i < Math.min(leftSize, rightSize); i++) {
    const isLeftList = typeof leftList[i] !== 'number';
    const isRightList = typeof rightList[i] !== 'number';

    let comparison: number;

    if (isLeftList && isRightList) {
      comparison = compareList(leftList[i], rightList[i]);
    } else if (isLeftList) {
      comparison = compareList(leftList[i], [rightList[i]]);
    } else if (isRightList) {
      comparison = compareList([leftList[i]], rightList[i]);
    } else {
      if (leftList[i] < rightList[i]) {
        return -1;
      } else if (leftList[i] > rightList[i]) {
        return 1;
      }
      continue;
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
