const { getIntArrayFromFile, timeit, range, sum, initMap } = require('../utilities');

timeit(() => {
  const data = getIntArrayFromFile(6, ',');

  let count = data.reduce((c, f) => ({ ...c, [f]: c[f] + 1 }), initMap(range(0, 9), 0));

  for (let _ in range(0, 256)) {
    count = Object.keys(count).reduce((updated, c) => {
      updated[c - 1 < 0 ? 6 : c - 1] += count[c];
      if (c - 1 < 0) updated[8] = count[c];
      return updated;
    }, initMap(range(0, 9), 0));
  }
  console.log(sum(Object.values(count)));
});
