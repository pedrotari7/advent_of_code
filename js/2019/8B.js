const { getSplittedDataFromFile, str2num, range } = require('../utilities');

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

const BgTransparent = '\x1b[43m';
const BgBlack = '\x1b[40m';
const BgWhite = '\x1b[47m';

const colors = [ BgBlack, BgWhite, BgTransparent ];

const print = a => a.forEach(row => {
  row.forEach(c => process.stdout.write(`${colors[c]}  `));
  process.stdout.write(`${BgBlack}\n`);
});

const image = layers.reduce((a, b) => {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      a[y][x] = a[y][x] === 2 ? b[y][x] : a[y][x];
    }
  }
  return a;
}, Array(H).fill(null).map(() => Array(W).fill(2)));

print(image);
