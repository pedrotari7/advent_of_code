const { getCharMatrixFromFile, timeit, int, prod, mult, addArrays } = require('../utilities');

const dir = { forward: [1, 0], down: [0, 1], up: [0, -1] };

timeit(() => {
  const data = mult(getCharMatrixFromFile(2, ' ').reduce((s, [d, c]) => addArrays(s, prod(dir[d], int(c))), [0, 0]));
  console.log(data);
});
