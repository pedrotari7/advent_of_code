
const { getSplittedDataFromFile, str2num, timer, sortAsc, combinations, sum, mult } = require('../utilities');

timer.start();

for (const comb of combinations(sortAsc(str2num(getSplittedDataFromFile(1))), 2)) {
    if (sum(comb) === 2020) {
        console.log(mult(comb));
        break;
    }
}

timer.stop();