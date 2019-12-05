const { getSplittedDataFromFile, str2num } = require('../utilities');

const data = str2num(getSplittedDataFromFile(2, ','));

const program = (d, a, b) => {
  let i = 0;
  d[1] = a;
  d[2] = b;

  while (d[i] !== 99) {
    if (d[i] === 1) {
      d[d[i + 3]] = d[d[i + 1]] + d[d[i + 2]];
    } else if (d[i] === 2) {
      d[d[i + 3]] = d[d[i + 1]] * d[d[i + 2]];
    }
    i += 4;
  }
  return d[0];
};

const target = 19690720;

let noun = 0,
  verb = 0;

while (program([ ...data ], noun, verb) !== target) {
  verb += 1;
  if (verb > 99) {
    verb = 0;
    noun += 1;
  }
}

console.log(100 * noun + verb);
