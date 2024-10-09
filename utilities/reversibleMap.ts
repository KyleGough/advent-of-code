export class ReversibleMap<S extends PropertyKey, T extends PropertyKey> {
  map: Record<S, T>;
  reverseMap: Record<T, S>;

  constructor() {
    this.map = {} as Record<S, T>;
    this.reverseMap = {} as Record<T, S>;
  }

  get(index: S): T {
    return this.map[index];
  }

  reverseGet(index: T): S {
    return this.reverseMap[index];
  }

  set(index: S, value: T): void {
    this.map[index] = value;
    this.reverseMap[value] = index;
  }
}
