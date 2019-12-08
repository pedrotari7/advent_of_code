const { getSplittedDataFromFile, str2num, range, sum } = require('../utilities');

const d = str2num(getSplittedDataFromFile(8, ''));

const W = 25, H = 6;

const N = d.length / (W * H);

const layers = range(0, N).map(() => Array(H).fill(null).map(() => Array(W).fill(-1)));

d.forEach((el, i) => {
  const z = Math.floor(i / (W * H));
  const local = i - z * W * H;
  const y = Math.floor(local / W);
  const x = local - y * W;
  layers[z][y][x] = el;
});

const count = (a, num) => sum(a.map(row => row.filter(c => c === num).length));

const best = layers.reduce((a, b) => count(a, 0) < count(b, 0) ? a : b);

console.log(best);

console.log(count(best, 1) * count(best, 2));

