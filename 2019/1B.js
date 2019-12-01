const data = require('fs').readFileSync('1.in', 'utf8').split('\n');

const modulus = e => Math.floor(e / 3) - 2;

console.log(data.reduce((r, ele) => {
  mass = modulus(+ele);
  while (mass > 0) {
    r += mass;
    mass = modulus(mass);
  }
  return r;
}, 0));