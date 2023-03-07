interface Transfer {
  low: number;
  high: number;
  lowToBot: boolean;
  highToBot: boolean;
}

export class Bots {
  botMap: Record<number, number[]>;
  transferMap: Record<number, Transfer>;
  outputMap: Record<number, number>;
  specialBot: number | undefined;

  constructor() {
    this.botMap = {};
    this.transferMap = {};
    this.outputMap = {};
  }

  setBotValue(bot: number, value: number) {
    this.botMap[bot] = this.botMap[bot]
      ? [...this.botMap[bot], value]
      : [value];
    this.transfer(bot);
  }

  clearBotValue(bot: number) {
    this.botMap[bot] = [];
  }

  getBotValues(bot: number): number[] {
    const [lowVal, highVal] = this.botMap[bot].sort((a, b) => a - b);

    if (lowVal === 17 && highVal === 61) {
      this.specialBot = bot;
    }

    return [lowVal, highVal];
  }

  addTransfer(bot: number, transfer: Transfer) {
    this.transferMap[bot] = transfer;
    this.transfer(bot);
  }

  canTransfer(bot: number): boolean {
    return this.botMap[bot]?.length === 2 && !!this.transferMap[bot];
  }

  transfer(bot: number) {
    if (!this.canTransfer(bot)) return;

    const { low, high, lowToBot, highToBot } = this.transferMap[bot];
    const [lowVal, highVal] = this.getBotValues(bot);

    // Clear bot values and transfer.
    this.clearBotValue(bot);
    delete this.transferMap[bot];

    if (lowToBot) {
      this.setBotValue(low, lowVal);
    } else {
      this.outputMap[low] = lowVal;
    }

    if (highToBot) {
      this.setBotValue(high, highVal);
    } else {
      this.outputMap[high] = highVal;
    }
  }
}

const parseValueInstruction = (input: string): [number, number] => {
  const valueMatch = input.match(
    /value (?<value>\d+) goes to bot (?<bot>\d+)/
  )?.groups;

  if (!valueMatch) throw new Error('Unable to parse value instruction');

  return [parseInt(valueMatch.bot), parseInt(valueMatch.value)];
};

const parseTransferInstruction = (input: string): [number, Transfer] => {
  const transferMatch = input.match(
    /bot (?<bot>\d+) gives low to (?<lowRecipient>\w+) (?<low>\d+) and high to (?<highRecipient>\w+) (?<high>\d+)/
  )?.groups;

  if (!transferMatch) throw new Error('Unable to parse transfer instruction');

  return [
    parseInt(transferMatch.bot),
    {
      low: parseInt(transferMatch.low),
      high: parseInt(transferMatch.high),
      lowToBot: transferMatch.lowRecipient === 'bot',
      highToBot: transferMatch.highRecipient === 'bot',
    },
  ];
};

export const simulate = (input: string) => {
  const instructions = input.split('\n');
  const bots = new Bots();

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];

    if (instruction.startsWith('value')) {
      bots.setBotValue(...parseValueInstruction(instruction));
    } else {
      bots.addTransfer(...parseTransferInstruction(instruction));
    }
  }

  return bots;
};
