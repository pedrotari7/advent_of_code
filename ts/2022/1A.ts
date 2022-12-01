import { timer, getSplittedDataFromFile, sum, max, int10 } from '../utilities.ts';

timer.start();

const res = max(getSplittedDataFromFile(1, '\n\n').map((s) => sum(s.split('\n').map(int10))));

console.log(res);

timer.stop();
