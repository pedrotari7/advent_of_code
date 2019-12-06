const { getSplittedDataFromFile, sum } = require('../utilities');

const data = getSplittedDataFromFile(6).map(e => e.split(')'));

const map = data.reduce((obj, orbit) => {
  obj[orbit[1]] = orbit[0];
  return obj;
}, {});

const count = {};

for (let planet in map) {
  let current = planet;

  while (current in map) {
    if (current in count) {
      count[planet] += count[current];
      break;
    }
    count[planet] = planet in count ? count[planet] + 1 : 1;
    current = map[current];
  }
}

console.log(sum(Object.values(count)));
