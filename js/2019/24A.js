const { getSplittedDataFromFile, sum } = require('../utilities');

const N = 5;

const get = (c, i, j) => i >= 0 && i < N && j >= 0 && j < N ? Number((c & 1 << i * N + j) !== 0) : 0;

const hash = (d) => sum(d.map((a, i) => sum(a.split('').map((b, j) => (b === '#') * Math.pow(2, i * N + j)))));

const mutate = (c) => {
  let next = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const isBug = get(c, i, j);
      const count = sum([ get(c, i + 1, j), get(c, i - 1, j), get(c, i, j + 1), get(c, i, j - 1) ]);
      if (!isBug && (count === 1 || count === 2) || isBug && count === 1) {
        next |= 1 << i * N + j;
      }
    }
  }
  return next;
};

const layouts = new Set();

let current = hash(getSplittedDataFromFile(24));

while (!layouts.has(current)) {
  layouts.add(current);
  current = mutate(current);
}

console.log(current);
