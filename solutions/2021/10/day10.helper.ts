export type Bracket = '[' | ']' | '(' | ')' | '{' | '}' | '<' | '>';

export const bracketMatch: Record<Bracket, Bracket> = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};
