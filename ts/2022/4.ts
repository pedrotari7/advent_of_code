import { timer, getMatrixFromFile, int10 } from '../utilities.ts';

timer.start();

const data = getMatrixFromFile<string>(4, '-').map(r => r.flatMap(e => e.split(',')).map(int10));

const p1 = data.reduce((count, [a, b, c, d]) => count + +((a >= c && b <= d) || (a <= c && b >= d)), 0);

const p2 = data.reduce((count, [a, b, c, d]) => count + +!(a > d || b < c), 0);

console.log('p1', p1);
console.log('p2', p2);

timer.stop();
