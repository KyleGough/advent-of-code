import { Intcode } from '../05/day05.helper';

type SendSignalHandler = (destination: number, x: number, y: number) => void;

export class NetworkedComputer {
  id: number;
  program: Intcode;
  inputBuffer: number[];
  outputBuffer: number[];
  network: NetworkedComputer[];
  sendSignal: SendSignalHandler;
  emptyInputReceived: boolean;
  idle: boolean;

  constructor(
    id: number,
    program: number[],
    network: NetworkedComputer[],
    sendSignal: SendSignalHandler
  ) {
    this.id = id;
    this.inputBuffer = [id];
    this.outputBuffer = [];
    this.program = new Intcode(program);
    this.network = network;
    this.sendSignal = sendSignal;
    this.emptyInputReceived = false;
    this.idle = false;
  }

  processStep(): void {
    if (this.idle && !this.inputBuffer.length) return;

    const input = this.inputBuffer.length ? this.inputBuffer : [-1];

    if (this.inputBuffer.length) {
      this.emptyInputReceived = false;
      this.idle = false;
    }

    const { opcode } = this.program.getInstruction();

    if (opcode === 3 && !this.inputBuffer.length) {
      if (this.emptyInputReceived) {
        this.idle = true;
      }
      this.emptyInputReceived = true;
    }

    const output = this.program.runStep(input);
    this.outputBuffer.push(...output);

    if (this.outputBuffer.length === 3) {
      const [destination, x, y] = this.outputBuffer;
      // Clear output buffer.
      this.outputBuffer = [];
      // Send output to another computer's input buffer.
      this.sendSignal(destination, x, y);
    }
  }
}
