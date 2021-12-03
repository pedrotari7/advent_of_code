const { timeit, getIntMatrixFromFile, addArrays, bin, fill } = require('../utilities');

timeit(() => {
  const a = getIntMatrixFromFile(3, '');

  const gama = a.reduce(addArrays, fill(a[0].length)).map((d) => Math.round(d / a.length));
  const epsilon = gama.map((x) => 1 - x);

  console.log(bin(gama) * bin(epsilon));
});
