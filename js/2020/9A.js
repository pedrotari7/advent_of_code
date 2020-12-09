const { getIntMatrixFromFile, timer } = require('../utilities');

timer.start();

const data = getIntMatrixFromFile(9).flat();

const step = 25;

for (let i = step; i < data.length; i++) {
    const values = data.slice(i - step, i);
    if (!values.some(n => values.includes(data[i] - n))) {
        console.log(data[i]);
        break
    }
}

timer.stop();

