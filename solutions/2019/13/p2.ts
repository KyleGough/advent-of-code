import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { intcodeComputerStep } from '../05/day05.helper';

export const day13p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  return playArcade([2, ...nums.slice(1)]);
};

const playArcade = (nums: number[]): number => {
  let step = { ip: 0, base: 0, output: 0, halt: false };
  let ball = 0;
  let paddle = 0;
  let score = 0;

  while (!step.halt) {
    step = runStepWithJoystick(nums, step.ip, step.base, ball, paddle);
    const x = step.output;
    step = runStepWithJoystick(nums, step.ip, step.base, ball, paddle);
    const y = step.output;
    step = runStepWithJoystick(nums, step.ip, step.base, ball, paddle);
    const id = step.output;

    if (x === -1 && y === 0) {
      // Update score.
      score = id;
    } else if (id === 3) {
      // Track paddle.
      paddle = x;
    } else if (id === 4) {
      // Track ball.
      ball = x;
    }
  }

  return score;
};

const runStepWithJoystick = (
  nums: number[],
  ip: number,
  base: number,
  ball: number,
  paddle: number
) => {
  let joystick = 0;

  if (ball < paddle) {
    joystick = -1;
  } else if (ball > paddle) {
    joystick = 1;
  }

  return intcodeComputerStep(nums, [joystick], ip, base);
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 15957
