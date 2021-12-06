const { getIntArrayFromFile, timeit, range, sum } = require('../utilities');

timeit(() => {
  const data = getIntArrayFromFile(6, ',');

  const init = () => range(0, 9).reduce((c, i) => ({ ...c, [i]: 0 }), {});

  let count = data.reduce((c, f) => ({ ...c, [f]: c[f] + 1 }), init());

  for (let _ in range(0, 256)) {
    count = Object.keys(count).reduce((updated, c) => {
      updated[c - 1 < 0 ? 6 : c - 1] += count[c];
      if (c - 1 < 0) updated[8] = count[c];
      return updated;
    }, init());
  }
  console.log(sum(Object.values(count)));
});
