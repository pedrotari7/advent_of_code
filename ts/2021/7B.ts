import { getIntArrayFromFile, timer, max, sum, range } from '../utilities.ts';

timer.start();

const data = getIntArrayFromFile(7, ',');

const euler = (n: number) => (n * (n + 1)) / 2;

const best = range(0, max(data)).reduce(
  ({ b, i }, c) => {
    const fuel = sum(data.map(d => euler(Math.abs(d - c))));
    return fuel < b ? { b: fuel, i: c } : { b, i };
  },
  { b: 2 ** 32, i: 0 }
);

console.log(`best`, best);

timer.stop();
