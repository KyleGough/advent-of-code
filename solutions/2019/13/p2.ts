import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Intcode } from '../05/day05.helper';

export const day13p2 = (input: string) => {
  const nums = input.split(',').map(Number);
  return playArcade([2, ...nums.slice(1)]);
};

const playArcade = (nums: number[]): number => {
  const program = new Intcode(nums);
  let ball = 0;
  let paddle = 0;
  let score = 0;

  while (!program.halt) {
    const x = runStepWithJoystick(program, ball, paddle);
    const y = runStepWithJoystick(program, ball, paddle);
    const id = runStepWithJoystick(program, ball, paddle);

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
  program: Intcode,
  ball: number,
  paddle: number
): number => {
  let joystick = 0;

  if (ball < paddle) {
    joystick = -1;
  } else if (ball > paddle) {
    joystick = 1;
  }

  return program.awaitOutput([joystick]);
};

const input = getPuzzle(__dirname).input;
run(() => day13p2(input)); // 15957
