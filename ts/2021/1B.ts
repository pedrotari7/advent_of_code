import { timer, getIntArrayFromFile, inRange, sum } from '../utilities.ts';

timer.start();

const data = getIntArrayFromFile(1);

const window = (i: number) => sum(data.slice(i - 2, i + 1));

const windows = data.reduce((w, _, i) => (inRange(i, 3, data.length) ? [...w, window(i)] : w), [] as number[]);

const [count] = windows.reduce(([count, prev], w) => [count + +(w > prev), w], [0, NaN]);

console.log(count);

timer.stop();
