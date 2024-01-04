type ConjuctionMemory = Record<string, 'LOW' | 'HIGH'>;

export interface Pulse {
  start: string;
  signal: 'LOW' | 'HIGH';
  target: string;
}

class Module {
  name: string;
  type: string;
  outputs: string[];
  memory: 'OFF' | 'ON' | ConjuctionMemory;

  constructor(name: string, type: string, outputs: string[]) {
    this.name = name;
    this.type = type;
    this.outputs = outputs;

    if (type === '%') {
      this.memory = 'OFF';
    } else {
      this.memory = {};
    }
  }
}

export const constructModules = (
  input: string
): [Record<string, Module>, string[]] => {
  const lines = input.split('\n');

  let broadcast: string[] = [];
  const modules: Record<string, Module> = {};

  // Build initial modules.
  for (let i = 0; i < lines.length; i++) {
    const [pre, post] = lines[i].split(' -> ');
    const outputs = post.split(', ');

    if (pre === 'broadcaster') {
      broadcast = outputs;
      continue;
    }

    const name = pre.slice(1);
    const type = pre.charAt(0);

    modules[name] = new Module(name, type, outputs);
  }

  // Populate conjuction modules' memory.
  for (const [name, module] of Object.entries(modules)) {
    for (const output of module.outputs) {
      if (modules?.[output]?.type === '&') {
        (modules[output].memory as ConjuctionMemory)[name] = 'LOW';
      }
    }
  }

  return [modules, broadcast];
};

export const getInitialPulses = (broadcast: string[]): Pulse[] => {
  return broadcast.map((i) => ({
    start: 'broadcaster',
    signal: 'LOW',
    target: i,
  }));
};

export const getFlipFlopPulses = (
  targetModule: Module,
  signal: Pulse['signal']
): Pulse[] => {
  const pulses: Pulse[] = [];

  // Ignore high signals.
  if (signal === 'LOW') {
    // Flip the memory.
    targetModule.memory = targetModule.memory === 'ON' ? 'OFF' : 'ON';

    // Send pulse to outputs.
    for (const output of targetModule.outputs) {
      pulses.push({
        start: targetModule.name,
        signal: targetModule.memory === 'ON' ? 'HIGH' : 'LOW',
        target: output,
      });
    }
  }

  return pulses;
};

export const getConjuctionPulses = (
  targetModule: Module,
  start: string,
  signal: Pulse['signal']
): Pulse[] => {
  const pulses: Pulse[] = [];

  // Conjuction module.
  (targetModule.memory as ConjuctionMemory)[start] = signal;

  // If all memory records are high, send a low, otherwise send a high signal.
  const targetMemory = Object.values(targetModule.memory as ConjuctionMemory);
  const allHighSignal =
    targetMemory.length === targetMemory.filter((i) => i === 'HIGH').length;
  for (const output of targetModule.outputs) {
    pulses.push({
      start: targetModule.name,
      signal: allHighSignal ? 'LOW' : 'HIGH',
      target: output,
    });
  }

  return pulses;
};
