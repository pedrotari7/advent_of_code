const { getIntArrayFromFile, timeit, sum, inRange } = require('../utilities');

timeit(() => {
  const data = getIntArrayFromFile(1);

  const window = (i) => sum(data.slice(i, i + 3));

  const windows = data.reduce((w, _, i) => (!inRange(i, 0, data.length - 2) ? w : [...w, window(i)]), []);

  const [count] = windows.reduce(([count, prev], w) => [count + (w > prev), w], [0]);

  console.log(count);
});
