const { getSplittedDataFromFile, str2num } = require('../utilities');

const d = str2num(getSplittedDataFromFile(2, ','));

let i = 0;
d[1] = 12;
d[2] = 2;

while (d[i] !== 99) {
  if (d[i] === 1) {
    d[d[i + 3]] = d[d[i + 1]] + d[d[i + 2]];
  } else if (d[i] === 2) {
    d[d[i + 3]] = d[d[i + 1]] * d[d[i + 2]];
  }
  i += 4;
}

console.log(d[0]);
