const top = 0;
const parent = (n: number) => ((n + 1) >>> 1) - 1;
const left = (n: number) => (n << 1) + 1;
const right = (n: number) => (n + 1) << 1;

type ComparisonFn<T> = (a: T, b: T) => boolean;

export class PriorityQueue<T> {
  _heap: T[];
  _comparator: ComparisonFn<T>;

  constructor(comparator: ComparisonFn<T>) {
    this._comparator = comparator;
    this._heap = [];
  }

  size() {
    return this._heap.length;
  }

  isEmpty() {
    return this.size() == 0;
  }

  peek() {
    return this._heap[top];
  }

  push(value: T) {
    this._heap.push(value);
    this._siftUp();
  }

  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }

  replace(value: T) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }

  _greater(i: number, j: number) {
    return this._comparator(this._heap[i], this._heap[j]);
  }

  _swap(i: number, j: number) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }

  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }

  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      const maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}
