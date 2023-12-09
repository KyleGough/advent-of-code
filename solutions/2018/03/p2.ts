import { getPuzzle } from '@utilities/getPuzzle';
import { run } from '@utilities/run';
import { Claim, parseClaim } from './day03.helper';

export const day03p2 = (input: string) => {
  const claims = input.split('\n').map(parseClaim);

  for (let i = 0; i < claims.length; i++) {
    let claimsOverlap = false;
    for (let j = 0; j < claims.length; j++) {
      if (i === j) continue;
      claimsOverlap = isOverlap(claims[i], claims[j]) || claimsOverlap;
      if (claimsOverlap) {
        break;
      }
    }
    if (!claimsOverlap) {
      return claims[i].id;
    }
  }
};

const isOverlap = (claimA: Claim, claimB: Claim): boolean => {
  const xOverlapA = claimB.x >= claimA.x && claimB.x < claimA.x + claimA.width;
  const xOverlapB = claimA.x >= claimB.x && claimA.x < claimB.x + claimB.width;
  const yOverlapA = claimB.y >= claimA.y && claimB.y < claimA.y + claimA.height;
  const yOverlapB = claimA.y >= claimB.y && claimA.y < claimB.y + claimB.height;
  return (xOverlapA || xOverlapB) && (yOverlapA || yOverlapB);
};

const input = getPuzzle(__dirname).input;
run(() => day03p2(input)); // 840
