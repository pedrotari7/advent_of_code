import { timer, getIntMatrixFromFile, addArrays, fill, bin } from '../utilities.ts';

timer.start();

const a = getIntMatrixFromFile(3, '');

const gama = a.reduce(addArrays, fill(a[0].length)).map((d) => Math.round(d / a.length));
const epsilon = gama.map((x) => 1 - x);

console.log(bin(gama) * bin(epsilon));

timer.stop();
