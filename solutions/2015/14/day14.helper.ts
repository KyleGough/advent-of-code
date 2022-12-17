export interface Reindeer {
  speed: number;
  duration: number;
  rest: number;
}

export const parseReindeer = (input: string): Reindeer => {
  const matches = input.match(
    /.* can fly (?<speed>\d+) km\/s for (?<duration>\d+) .* (?<rest>\d+) .*/
  )?.groups;

  if (!matches) throw new Error('Unable to parse Reindeer.');

  return {
    speed: parseInt(matches.speed),
    duration: parseInt(matches.duration),
    rest: parseInt(matches.rest),
  };
};
