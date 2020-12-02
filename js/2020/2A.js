const { getDataFromFile, timer, charCount, sum } = require('../utilities');

timer.start();

const data = [...getDataFromFile(2).matchAll(/(\d+)-(\d+)\s([a-z]):\s([a-z]+)/gm)];

console.log(sum(data.map(([_, lo, hi, l, pass]) => charCount(pass, l) >= lo && charCount(pass, l) <= hi)));

timer.stop();