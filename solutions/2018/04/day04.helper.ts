export type GuardData = Record<number, Record<number, number>>;

type Action = 'Begin Shift' | 'Fall Asleep' | 'Wake Up';

interface LogData {
  datetime: number[];
  action: Action;
  guard?: number;
}

export const parseLog = (input: string): LogData => {
  const dateGroups = input.match(
    /\[(?<year>\d{4})\-(?<month>\d{2})-(?<day>\d{2}) (?<hour>\d{2}):(?<minute>\d{2})\]/
  )?.groups;

  if (!dateGroups) {
    throw new Error('Unable to parse log');
  }

  const datetime = [
    dateGroups.year,
    dateGroups.month,
    dateGroups.day,
    dateGroups.hour,
    dateGroups.minute,
  ].map((i) => parseInt(i));

  const beginMatch = input.match(/Guard #(?<guard>\d+)/)?.groups;
  if (beginMatch) {
    return {
      datetime,
      action: 'Begin Shift',
      guard: parseInt(beginMatch.guard),
    };
  }

  const wakeMatch = input.match(/wakes up/);
  return {
    datetime,
    action: wakeMatch ? 'Wake Up' : 'Fall Asleep',
  };
};

export const sortLog = (logA: LogData, logB: LogData): number => {
  for (let i = 0; i < logA.datetime.length; i++) {
    if (logA.datetime[i] > logB.datetime[i]) {
      return 1;
    } else if (logA.datetime[i] < logB.datetime[i]) {
      return -1;
    }
  }

  return 0;
};

export const getGuardData = (logs: LogData[]): GuardData => {
  let currentGuard = 0;
  const guardData: GuardData = {};
  let logIndex = 0;

  while (logIndex < logs.length) {
    const { datetime, action, guard } = logs[logIndex];

    if (action === 'Begin Shift') {
      currentGuard = guard as number;
      if (!guardData[currentGuard]) {
        guardData[currentGuard] = {};
      }
    } else if (action === 'Fall Asleep') {
      const awake = logs[logIndex + 1].datetime[4];
      logIndex++;
      for (let i = datetime[4]; i < awake; i++) {
        if (guardData[currentGuard][i]) {
          guardData[currentGuard][i] += 1;
        } else {
          guardData[currentGuard][i] = 1;
        }
      }
    }

    logIndex++;
  }

  return guardData;
};
