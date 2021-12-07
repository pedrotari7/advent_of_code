import { timer, getIntArrayFromFile } from '../utilities.ts';

timer.start();

const data = getIntArrayFromFile(1);

const [count] = data.reduce(([count, prev], m) => [count + +(m > prev), m], [0, NaN]);

console.log(count);

timer.stop();
