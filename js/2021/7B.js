const { getIntArrayFromFile, timeit, max, sum, range } = require('../utilities');

const euler = (n) => (n * (n + 1)) / 2;

timeit(() => {
  const data = getIntArrayFromFile(7, ',');

  const best = range(0, max(data)).reduce(
    ({ b, i }, c) => {
      const fuel = sum(data.map((d) => euler(Math.abs(d - c))));
      return fuel < b ? { b: fuel, i: c } : { b, i };
    },
    { b: 2 ** 32, i: 0 }
  );

  console.log(`best`, best);
});
