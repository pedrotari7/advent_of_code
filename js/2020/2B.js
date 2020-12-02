
const { getDataFromFile, timer, sum } = require('../utilities');

timer.start();

const data = [...getDataFromFile(2).matchAll(/(\d+)-(\d+)\s([a-z]):\s([a-z]+)/gm)];

console.log(sum(data.map(([_, lo, hi, l, pass]) => pass[hi - 1] === l ^ pass[lo - 1] === l)));

timer.stop();