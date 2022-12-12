export interface Monkey {
  inspectCount: number;
  itemList: number[];
  operation: {
    operator: '+' | '*';
    operand: 'old' | number;
  };
  testDivisible: number;
  trueThrow: number;
  falseThrow: number;
}

export const parseMonkey = (text: string): Monkey => {
  const monkeyLines = text.split('\n');

  const startingItemsMatch = monkeyLines[1].match(/Starting items: (.*)/);
  const startingItems = startingItemsMatch
    ? startingItemsMatch[1].split(', ').map((i) => parseInt(i))
    : [];

  const operationArr = monkeyLines[2].split(' ');
  const operator = operationArr[operationArr.length - 2];
  const operand = operationArr[operationArr.length - 1];

  const testDivisible = monkeyLines[3].split(' ');
  const trueThrow = monkeyLines[4].split(' ');
  const falseThrow = monkeyLines[5].split(' ');

  return {
    inspectCount: 0,
    itemList: startingItems,
    operation: {
      operator: operator === '+' ? '+' : '*',
      operand: operand === 'old' ? 'old' : parseInt(operand),
    },
    testDivisible: parseInt(testDivisible[testDivisible.length - 1]),
    trueThrow: parseInt(trueThrow[trueThrow.length - 1]),
    falseThrow: parseInt(falseThrow[falseThrow.length - 1]),
  };
};

export const inspectItem = (worry: number, monkey: Monkey) => {
  if (monkey.operation.operator === '+') {
    return (
      worry +
      (monkey.operation.operand === 'old' ? worry : monkey.operation.operand)
    );
  } else {
    return (
      worry *
      (monkey.operation.operand === 'old' ? worry : monkey.operation.operand)
    );
  }
};
