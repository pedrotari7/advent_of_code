const { getCharMatrixFromFile, timeit, int, prod, addArrays } = require('../utilities');

const dir = (s, d, c) =>
  ({
    forward: addArrays(s, [int(c), int(c) * s[2], 0]),
    down: addArrays(s, prod([0, 0, 1], int(c))),
    up: addArrays(s, prod([0, 0, -1], int(c))),
  }[d]);

timeit(() => {
  const data = getCharMatrixFromFile(2, ' ').reduce((s, [d, c]) => dir(s, d, c), [0, 0, 0]);
  console.log(data[0] * data[1]);
});
