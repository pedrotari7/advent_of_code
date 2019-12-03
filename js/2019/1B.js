const { getSplittedDataFromFile } = require('../utilities');

const data = getSplittedDataFromFile(1);

const modulus = e => Math.floor(e / 3) - 2;

console.log(
  data.reduce((r, ele) => {
    mass = modulus(+ele);
    while (mass > 0) {
      r += mass;
      mass = modulus(mass);
    }
    return r;
  }, 0)
);
