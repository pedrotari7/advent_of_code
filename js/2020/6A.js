const { timer, sum, getDataFromFile } = require('../utilities');

timer.start();

console.log(sum(getDataFromFile(6).split('\n\n').map(s => new Set(s.split('\n').join('')).size)));

timer.stop();
