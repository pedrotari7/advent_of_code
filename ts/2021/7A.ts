import { getIntArrayFromFile, timeit, max, sum, range } from '../utilities.ts';

timeit(() => {
  const data = getIntArrayFromFile(7, ',');

  const best = range(0, max(data)).reduce(
    ({ b, i }, c) => {
      const fuel = sum(data.map(d => Math.abs(d - c)));
      return fuel < b ? { b: fuel, i: c } : { b, i };
    },
    { b: 2 ** 32, i: 0 }
  );

  console.log(`best`, best);
});
