export class Stack<T> {
  _stack: T[];

  constructor() {
    this._stack = [];
  }

  size(): number {
    return this._stack.length;
  }

  isEmpty(): boolean {
    return this.size() == 0;
  }

  peek(): T | undefined {
    return this._stack[this.size() - 1];
  }

  push(value: T) {
    this._stack.push(value);
  }

  pop(): T | undefined {
    return this._stack.pop();
  }
}
