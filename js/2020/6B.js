const { timer, sum, getDataFromFile } = require('../utilities');

timer.start();

const data = getDataFromFile(6).split('\n\n');

console.log(sum(data.map(s => s.split('\n').map(p => new Set(p)).reduce((acc, v) => {
    acc = new Set([...v].filter(x => acc.has(x)));
    return acc;
}).size)));

timer.stop();
