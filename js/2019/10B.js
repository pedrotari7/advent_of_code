
const { getSplittedDataFromFile } = require('../utilities');
const { bestStation } = require('./10A');

let asteroids = getSplittedDataFromFile(10).reduce((total, line, y) => {
  const n = line.split('').reduce((arr, e, x) => {
    if (e === '#') {
      arr.push([ x, y ]);
    }
    return arr;
  }, []);
  return total.concat(n);
}, []);

const station = bestStation(asteroids)[1];

asteroids = asteroids.filter(e => e !== station);

const angle = (a, b) => 360 * Math.atan2(a[0] - b[0], a[1] - b[1]) / (2 * Math.PI);

const dist = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));

const getTargets = (st) => {
  const targets = {};
  for (let asteroid of asteroids) {
    const theta = angle(st, asteroid);
    const r = dist(st, asteroid);

    if (theta in targets) {
      targets[theta] = r < targets[theta].r ? { asteroid, r } : targets[theta];
    } else {
      targets[theta] = { asteroid, r };
    }
  }
  return targets;
};

const targets = getTargets(station);

const keys = Object.keys(targets).map(k => Number(k)).sort((a, b) => -(a - b));

const closest = keys.reduce((prev, curr) => Math.abs(curr - 0) < Math.abs(prev - 0) ? curr : prev);

const offset = keys.indexOf(closest);

const last = targets[keys[(offset + 200 - 1) % keys.length]].asteroid;

console.log(last[0] * 100 + last[1]);


