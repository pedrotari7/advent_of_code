import { timer, getSplittedDataFromFile, sum, int10 } from '../utilities.ts';

timer.start();

const res = sum(
  getSplittedDataFromFile(1, '\n\n')
    .map((s) => sum(s.split('\n').map(int10)))
    .sort()
    .slice(-3)
);

console.log(res);

timer.stop();
