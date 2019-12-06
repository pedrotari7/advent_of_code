const { getSplittedDataFromFile, sum } = require('../utilities');

const data = getSplittedDataFromFile(6).map(e => e.split(')'));

const path = (map, start) => {
  const arr = [];
  let current = start;
  while (current in map) {
    arr.push(current);
    current = map[current];
  }
  return arr;
};

const map = data.reduce((obj, orbit) => {
  obj[orbit[1]] = orbit[0];
  return obj;
}, {});

const YOUPath = path(map, 'YOU');
const SANPath = path(map, 'SAN');

let total = 0;

for (let i = 0; i < YOUPath.length; i++) {
  if (SANPath.includes(YOUPath[i])) {
    total += i - 1;
    break;
  }
}

total += SANPath.indexOf(YOUPath[total + 1]) - 1;

console.log(total);
