const isPeekOperator = (stack: string[]): boolean => {
  return !!stack.length && ['+', '*'].includes(stack[stack.length - 1]);
};

const peek = (stack: string[]): string | undefined => {
  return stack?.[stack.length - 1];
};

const precendenceCheck = (
  precedence: string[] = [],
  char: '+' | '*',
  stack: string[]
): boolean => {
  const charPrecedence = precedence.indexOf(char);
  const peekPrecedence = precedence.indexOf(peek(stack) as '+' | '*');
  return charPrecedence >= peekPrecedence;
};

export const convertToRpn = (expression: string, precedence: string[] = []) => {
  const stack: string[] = [];
  const output: string[] = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);

    switch (char) {
      case '+':
      case '*':
        while (
          isPeekOperator(stack) &&
          precendenceCheck(precedence, char, stack)
        ) {
          output.push(stack.pop() as string);
        }
        stack.push(char);
        break;
      case '(':
        stack.push(char);
        break;
      case ')':
        while (peek(stack) !== '(') {
          output.push(stack.pop() as string);
        }
        stack.pop();
        break;
      default:
        output.push(char);
        break;
    }
  }

  while (stack.length) {
    output.push(stack.pop() as string);
  }

  return output.join('');
};

export const solve = (rpn: string): number => {
  const stack: number[] = [];
  let operandA: number;
  let operandB: number;

  for (let i = 0; i < rpn.length; i++) {
    const char = rpn.charAt(i);

    switch (char) {
      case '+':
        operandA = stack.pop() as number;
        operandB = stack.pop() as number;
        stack.push(operandA + operandB);
        break;
      case '*':
        operandA = stack.pop() as number;
        operandB = stack.pop() as number;
        stack.push(operandA * operandB);
        break;
      default:
        stack.push(parseInt(char));
    }
  }

  return stack.pop() as number;
};
