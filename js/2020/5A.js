const { timer, getSplittedDataFromFile, bin, sum, max } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(5).map(s => s.split('').map(p => (p === 'B' || p === 'R') ? '1' : '0').join(''));

const seats = data.map(s => sum([bin(s.slice(0, 7)) * 8, bin(s.slice(7))]))

console.log(max(seats))

timer.stop();
