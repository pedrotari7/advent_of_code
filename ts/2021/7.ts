import { getIntArrayFromFile, timer, max, sum, range } from '../utilities.ts';

timer.start();
const data = getIntArrayFromFile(7, ',');

const findBest = (fn: (n: number) => number) =>
  range(0, max(data)).reduce(
    ({ b, i }, c) => {
      const fuel = sum(data.map(d => fn(Math.abs(d - c))));
      return fuel < b ? { b: fuel, i: c } : { b, i };
    },
    { b: 2 ** 32, i: 0 }
  ).b;

console.log(
  `p1`,
  findBest(n => n)
);

console.log(
  `p2`,
  findBest(n => (n * (n + 1)) / 2)
);

timer.stop();
