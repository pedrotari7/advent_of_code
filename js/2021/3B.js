const { timeit, getIntMatrixFromFile, addArrays, bin, fill, range } = require('../utilities');

timeit(() => {
  const data = getIntMatrixFromFile(3, '');

  const getGama = (a) => a.reduce(addArrays, fill(a[0].length)).map((d) => Math.round(d / a.length));
  const getEpsilon = (a) => getGama(a).map((x) => 1 - x);

  const getLife = (a, criteria) =>
    range(0, a[0].length)
      .reduce((x, i) => {
        const c = criteria(x);
        return x.length === 1 ? x : x.filter((v) => v[i] === c[i]);
      }, a)
      .pop();

  const o2 = getLife(data, getGama);
  const co2 = getLife(data, getEpsilon);

  console.log(bin(o2) * bin(co2));
});
