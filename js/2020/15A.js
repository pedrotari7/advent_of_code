const { timer, getIntMatrixFromFile } = require('../utilities');

timer.start();

const data = getIntMatrixFromFile(15, ',')[0];

const rec = data.reduce((acc, v, idx) => { acc[v] = [idx + 1, idx + 1]; return acc }, new Map());

let prev = data[data.length - 1];
for (let i = data.length + 1; i <= 2020; i++) {
    prev = rec[prev] ? rec[prev][1] - rec[prev][0] : prev;

    if (prev in rec) {
        rec[prev] = [rec[prev][1], i];
    } else {
        rec[prev] = [i, i];
    }
}

console.log('prev', prev)

timer.stop();
