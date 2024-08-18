export interface Cup {
  value: number;
  next: Cup;
}

export const parseCups = (
  initialValues: number[],
  extension: number[] = []
): Cup => {
  const values = [...initialValues, ...extension];
  const start = {
    value: values[0],
  } as Cup;

  start.next = start;

  let previous: Cup = start;

  for (const value of values.slice(1)) {
    const next = {
      value,
    } as Cup;
    previous.next = next;
    previous = next;
  }

  previous.next = start;
  return start;
};

const getCupRecord = (current: Cup): Record<number, Cup> => {
  const cupRecord: Record<number, Cup> = {};
  let searchCurrent = current;
  const startValue = current.value;

  do {
    cupRecord[searchCurrent.value] = searchCurrent;
    searchCurrent = searchCurrent.next;
  } while (searchCurrent.value !== startValue);

  return cupRecord;
};

export const moveCups = (
  current: Cup,
  moves: number,
  minValue: number,
  maxValue: number
): Cup => {
  const cupRecord = getCupRecord(current);

  for (let i = 0; i < moves; i++) {
    const pick = current.next;
    current.next = current.next.next.next.next;

    const pickValues = [pick.value, pick.next.value, pick.next.next.value];
    let destination = current.value;

    do {
      destination -= 1;
      if (destination < minValue) {
        destination = maxValue;
      }
    } while (pickValues.includes(destination));

    const insert = cupRecord[destination];
    pick.next.next.next = insert.next;
    insert.next = pick;
    current = current.next;
  }

  console.log('adad');

  return cupRecord[1];
};
