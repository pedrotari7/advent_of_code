import { timer, getSplittedDataFromFile, isArray, RecursiveArray } from '../utilities.ts';

timer.start();

const compare = (left: number | RecursiveArray<number>, right: number | RecursiveArray<number>): number => {
  if (isArray(left) || isArray(right)) {
    if (isArray(left) && !isArray(right)) {
      right = [right];
    }

    if (!isArray(left) && isArray(right)) {
      left = [left];
    }

    left = left as RecursiveArray<number>;
    right = right as RecursiveArray<number>;

    for (const [i] of left.entries()) {
      if (i > right.length - 1) return 1;
      const result = compare(left[i], right[i]);
      if (result !== 0) {
        return result;
      }
    }
    return Math.sign(left.length - right.length);
  }

  return left === right ? 0 : Math.sign((left as number) - (right as number));
};

const pairs = getSplittedDataFromFile(13, '\n\n').map(r => r.split('\n').map(eval));

const p1 = pairs.reduce<number>((p1, [left, right], idx) => (compare(left, right) <= 0 ? p1 + idx + 1 : p1), 0);

console.log('p1', p1);

const D1 = [[2]];
const D2 = [[6]];

const packets = [D1, D2, ...pairs.flat()].sort(compare);

console.log('p2', (packets.findIndex(v => v === D1) + 1) * (packets.findIndex(v => v === D2) + 1));

timer.stop();
