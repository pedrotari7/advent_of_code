const { getIntArrayFromFile, timeit, sum, inRange } = require('../utilities');

timeit(() => {
  const data = getIntArrayFromFile(1);

  const window = (i) => sum(data.slice(i - 2, i + 1));

  const windows = data.reduce((w, _, i) => (inRange(i, 3, data.length) ? [...w, window(i)] : w), []);

  const [count] = windows.reduce(([count, prev], w) => [count + (w > prev), w], [0]);

  console.log(count);
});
