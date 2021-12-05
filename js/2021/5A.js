const { getCharMatrixFromFile, timeit, int, addArrays, subArrays, equals } = require('../utilities');

timeit(() => {
  const data = getCharMatrixFromFile(5, ' -> ').map((d) => d.map((c) => c.split(',').map(int)));

  const inc = (c) => (c ? c + 1 : 1);

  const count = data.reduce((count, [pos, end]) => {
    if (pos[0] !== end[0] && pos[1] !== end[1]) return count;

    const move = subArrays(end, pos).map(Math.sign);

    count[pos] = inc(count[pos]);

    while (!equals(pos, end)) {
      pos = addArrays(pos, move);
      count[pos] = inc(count[pos]);
    }

    return count;
  }, {});

  console.log(`count`, Object.values(count).filter((c) => c >= 2).length);
});
