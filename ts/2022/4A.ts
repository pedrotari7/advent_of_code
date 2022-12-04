import { timer, getMatrixFromFile, int10 } from '../utilities.ts';

timer.start();

const data = getMatrixFromFile<string>(4, '-')
  .map((r) => r.flatMap((e) => e.split(',')).map(int10))
  .reduce((count, [a, b, c, d]) => count + +((a >= c && b <= d) || (a <= c && b >= d)), 0);

console.log(data);

timer.stop();
