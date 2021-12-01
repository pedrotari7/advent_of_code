const { getIntArrayFromFile, timeit } = require('../utilities');

timeit(() => {
  const data = getIntArrayFromFile(1);

  const [count] = data.reduce(([count, prev], m) => [count + (m > prev), m], [0]);

  console.log(count);
});
