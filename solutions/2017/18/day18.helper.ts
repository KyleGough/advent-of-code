export class Registers {
  registers: Record<string, number>;
  registerNames: Set<string>;

  constructor(registers = {}) {
    this.registers = registers;
    this.registerNames = new Set<string>(Object.keys(this.registers));
  }

  hasRegister(register: string): boolean {
    return this.registerNames.has(register);
  }

  get(value: string): number {
    return this.hasRegister(value) ? this.registers[value] : parseInt(value);
  }

  set(name: string, value: string | number) {
    if (typeof value === 'string') {
      this.registers[name] = this.get(value);
    } else {
      this.registers[name] = value;
    }
    this.registerNames.add(name);
  }

  add(x: string, y: string) {
    this.set(x, this.get(x) + this.get(y));
  }

  mul(x: string, y: string) {
    this.set(x, this.get(x) * this.get(y));
  }

  mod(x: string, y: string) {
    this.set(x, this.get(x) % this.get(y));
  }

  jgz(x: string, y: string): number {
    return this.get(x) > 0 ? this.get(y) - 1 : 0;
  }
}
