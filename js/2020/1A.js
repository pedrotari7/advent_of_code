
const { getSplittedDataFromFile, str2num, timer, sortAsc } = require('../utilities');

timer.start();

const d = sortAsc(str2num(getSplittedDataFromFile(1)));

for (const [ia, a] of d.entries()) {
    for (const [ib, b] of d.entries()) {
        if (ia === ib) continue;
        if ((a + b) === 2020) {
            console.log(a * b)
            timer.stop();
            return;
        }
        if ((a + b) > 2020) break;
    }
}