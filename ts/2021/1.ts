import { timer, getIntArrayFromFile, sum, inRange } from '../utilities.ts';

timer.start();

const data = getIntArrayFromFile(1);

const [p1] = data.reduce(([count, prev], m) => [count + +(m > prev), m], [0, NaN]);

console.log('p1', p1);

const window = (i: number) => sum(data.slice(i - 2, i + 1));

const windows = data.reduce((w, _, i) => (inRange(i, 3, data.length) ? [...w, window(i)] : w), [] as number[]);

const [p2] = windows.reduce(([count, prev], w) => [count + +(w > prev), w], [0, NaN]);

console.log('p2', p2);

timer.stop();
