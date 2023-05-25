import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

type Direction = 'Left' | 'Right';
type StateTransition = [TransitionFunction, TransitionFunction];

interface TransitionFunction {
  write: number;
  move: Direction;
  next: string;
}

class Tape {
  private data: number[];
  private head: number;
  private readonly buffer: number;

  constructor(size = 100, buffer = 25) {
    this.data = Array(size).fill(0);
    this.head = Math.floor(size / 2);
    this.buffer = buffer;
  }

  public write(value: number) {
    this.data[this.head] = value;
  }

  public read() {
    return this.data[this.head];
  }

  public move(direction: Direction) {
    direction === 'Left' ? this.moveLeft() : this.moveRight();
  }

  private moveLeft() {
    this.head--;
    if (this.head < 0) {
      this.data = [...Array(this.buffer).fill(0), ...this.data];
      this.head += this.buffer;
    }
  }

  private moveRight() {
    this.head++;
    if (this.head >= this.data.length) {
      this.data = [...this.data, ...Array(this.buffer).fill(0)];
    }
  }

  public checksum() {
    return this.data.filter((i) => i === 1).length;
  }
}

const startConfig = (input: string): [string, number] => {
  const stateMatch = input.match(/Begin in state (?<state>.+)\./)?.groups;
  const stepsMatch = input.match(
    /Perform a diagnostic checksum after (?<steps>\d+) steps\./
  )?.groups;

  if (!stateMatch) throw new Error('Unable to parse beginning state.');
  if (!stepsMatch) throw new Error('Unable to parse diagnostic checksum.');

  return [stateMatch.state, parseInt(stepsMatch.steps)];
};

const parseTransitionFunction = (input: string[]): TransitionFunction => {
  const writeMatch = input[0].match(/Write the value (?<write>\d)\./)?.groups;
  const moveMatch = input[1].match(
    /Move one slot to the (?<move>left|right)\./
  )?.groups;
  const nextMatch = input[2].match(/Continue with state (?<next>.+)\./)?.groups;

  if (!writeMatch || !moveMatch || !nextMatch) {
    throw new Error('Unable to parse blueprint.');
  }

  return {
    write: parseInt(writeMatch.write),
    move: moveMatch.move === 'left' ? 'Left' : 'Right',
    next: nextMatch.next,
  };
};

const parseBlueprint = (input: string): Record<string, StateTransition> => {
  const lines = input.split('\n');

  const stateMatch = lines[0].match(/In state (?<state>.+):/)?.groups;
  if (!stateMatch) throw new Error('Unable to parse blueprint.');

  const zeroTransition = parseTransitionFunction(lines.slice(2, 5));
  const oneTransition = parseTransitionFunction(lines.slice(6, 9));

  return {
    [stateMatch.state]: [zeroTransition, oneTransition],
  };
};

export const day25p1 = (input: string) => {
  const tape = new Tape();
  const instructions = input.split('\n\n');
  const [startState, steps] = startConfig(instructions[0]);
  let state = startState;
  const blueprints = instructions
    .slice(1)
    .map((i) => parseBlueprint(i))
    .reduce((prev, curr) => Object.assign(prev, curr), {});

  for (let i = 0; i < steps; i++) {
    const head = tape.read();
    const transition = blueprints[state][head];
    tape.write(transition.write);
    tape.move(transition.move);
    state = transition.next;
  }

  return tape.checksum();
};

const input = getPuzzle(__dirname).input;
run(() => day25p1(input)); // 3554
