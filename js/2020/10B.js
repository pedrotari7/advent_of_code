const { getIntMatrixFromFile, timer, sortAsc } = require('../utilities');

timer.start();

let data = sortAsc(getIntMatrixFromFile(10).flat());

data = [0, ...data, data[data.length - 1] + 3];

const DP = {};

const dp = (i) => {
    if (i === (data.length - 1)) return 1;

    if (DP[i]) return DP[i];

    let count = 0;

    for (let j = i + 1; j < data.length; j++) {
        if ((data[j] - data[i]) <= 3) count += dp(j)
    }
    DP[i] = count;
    return count;
}

console.log(dp(0))

timer.stop();

