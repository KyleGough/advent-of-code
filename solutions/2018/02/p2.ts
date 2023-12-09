import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';

export const day02p2 = (input: string) => {
  const boxes = input.split('\n');
  const boxCount = boxes.length;

  for (let i = 0; i < boxCount - 1; i++) {
    for (let j = i + 1; j < boxCount; j++) {
      const intersection = stringIntersection(boxes[i], boxes[j]);
      if (intersection.length === boxes[i].length - 1) {
        return intersection;
      }
    }
  }
};

const stringIntersection = (boxA: string, boxB: string): string => {
  let intersection = '';
  for (let i = 0; i < boxA.length; i++) {
    if (boxA.charAt(i) === boxB.charAt(i)) {
      intersection += boxA.charAt(i);
    }
  }

  return intersection;
};

const input = getPuzzle(__dirname).input;
run(() => day02p2(input)); // wmlnjevbfodamyiqpucrhsukg
