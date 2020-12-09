const { getIntMatrixFromFile, timer, sum, max, min } = require('../utilities');

timer.start();

const data = getIntMatrixFromFile(9).flat();

let target;
const step = 25;

for (let i = step; i < data.length; i++) {
    const values = data.slice(i - step, i);
    if (!values.some(n => values.includes(data[i] - n))) {
        target = i;
        break
    }
}

const poss = data.slice(0, target);

for (k = poss.length - 1; k > 0; k--) {
    for (m = 0; m < poss.length && m !== k; m++) {
        const range = poss.slice(m, k + 1);
        if (sum(range) === data[target]) {
            console.log(min(range) + max(range));
            timer.stop();
            process.exit();

        }

    }
}
