const { getSplittedDataFromFile, str2num, intCode, perm } = require('../utilities');

const d = str2num(getSplittedDataFromFile(7, ','));

// const initPerm = [ 2, 1, 4, 3, 0 ];

const initOutput = 0;

// initPerm.forEach(phase => initOutput = intCode([ ...d ], [ phase, initOutput ]));

console.log(initOutput);

const signals = perm([ 5, 6, 7, 8, 9 ]).map(p => {
  let output = initOutput;
  p.forEach(phase => output = intCode([ ...d ], [ phase, output ]));
  return [ output, p ];
});

console.log(signals);

console.log(signals.reduce((a, b) => a[0] > b[0] ? a : b));
