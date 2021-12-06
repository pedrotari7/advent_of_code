const { getIntArrayFromFile, timeit, range, fill } = require('../utilities');

timeit(() => {
  let data = getIntArrayFromFile(6, ',');
  for (let _ in range(0, 80)) {
    data = data.map((f) => f - 1);
    const n = data.filter((f) => f === -1).length;
    data = [...data.map((f) => (f === -1 ? 6 : f)), ...fill(n, 8)];
  }
  console.log(data.length);
});
