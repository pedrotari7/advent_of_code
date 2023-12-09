import { timer, getSplittedDataFromFile, sum, nums, stepDiff } from '../utilities.ts';

timer.start();

const data = getSplittedDataFromFile(9).map(nums);

const solve = (seq: number[]) => {
  let r = 0;
  while (seq[0] !== 0 || seq.at(-1) !== 0) {
    r += seq.at(-1)!;
    seq = stepDiff(seq);
  }
  return r;
};

console.log('p1', sum(data.map(solve)));
console.log('p2', sum(data.map(r => r.toReversed()).map(solve)));

timer.stop();
