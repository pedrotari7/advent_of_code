import { timer, getIntMatrixFromFile, addArrays, fill, bin, range } from '../utilities.ts';

timer.start();

const a = getIntMatrixFromFile(3, '');

const getGama = (a: Report) => a.reduce(addArrays, fill(a[0].length, 0)).map(d => Math.round(d / a.length));
const getEpsilon = (a: Report) => getGama(a).map(x => 1 - x);

const gama = getGama(a);
const epsilon = gama.map(x => 1 - x);

console.log(bin(gama) * bin(epsilon));

type Report = number[][];

const getLife = (a: Report, criteria: (arr: Report) => number[]) =>
  range(0, a[0].length)
    .reduce((x, i) => {
      const c = criteria(x);
      return x.length === 1 ? x : x.filter(v => v[i] === c[i]);
    }, a)
    .pop()!;

const o2 = getLife(a, getGama);
const co2 = getLife(a, getEpsilon);

console.log(bin(o2) * bin(co2));

timer.stop();
