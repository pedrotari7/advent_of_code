const { timer, getSplittedDataFromFile, bin, sum, sortAsc } = require('../utilities');

timer.start();

const data = getSplittedDataFromFile(5).map(s => s.split('').map(p => (p === 'B' || p === 'R') ? '1' : '0').join(''));

const seats = sortAsc(data.map(s => sum([bin(s.slice(0, 7)) * 8, bin(s.slice(7))])));

let prev = seats[0] - 1;

for (let seat of seats) {
    if ((seat - prev) === 2) break;
    prev = seat;
}

console.log(prev + 1);

timer.stop();
