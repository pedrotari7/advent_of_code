const { getSplittedDataFromFile, str2num, intCode, perm } = require('../utilities');

const d = str2num(getSplittedDataFromFile(7, ','));

const signals = perm([ 0, 1, 2, 3, 4 ]).map(p => {
  let output = 0;
  p.forEach(phase => output = intCode([ ...d ], [ phase, output ]));
  return [ output, p ];
});

console.log(signals.reduce((a, b) => a[0] > b[0] ? a : b));
