const { getIntMatrixFromFile, timer, sortAsc } = require('../utilities');

timer.start();

let data = sortAsc(getIntMatrixFromFile(10).flat());

data = [0, ...data, data[data.length - 1] + 3];

let threes = 0;
let ones = 0;

for (let i = 1; i < data.length; i++) {
    (data[i] - data[i - 1]) === 3 ? threes++ : ones++
}

console.log(threes * ones)

timer.stop();

