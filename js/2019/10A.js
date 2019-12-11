
const { getSplittedDataFromFile } = require('../utilities');

const d = getSplittedDataFromFile(10).reduce((total, line, y) => {
  return total.concat(line.split('').reduce((arr, e, x) => {
    if (e === '#') {
      arr.push([ x, y ]);
    }
    return arr;
  }, []));
}, []);

const angle = (a, b) => Math.atan2(b[0] - a[0], b[1] - a[1]);

const bestStation = (asteroids) => {
  let best = [ 0, [] ];

  for (let asteroid of asteroids) {
    const angles = new Set();
    for (let other of asteroids) {
      if (asteroid !== other) {
        angles.add(angle(asteroid, other));
      }
    }

    if (angles.size > best[0]) {
      best = [ angles.size, asteroid ];
    }
  }
  return best;
};

exports.bestStation = bestStation;

console.log(bestStation(d));
