const { getSplittedDataFromFile, timer, int } = require('../utilities');

timer.start();

run = (d) => {
    let i = 0, acc = 0;
    const hist = new Set();

    while (!hist.has(i)) {
        hist.add(i);
        const [op, v] = [d[i][0], int(d[i][1])];
        if (op === 'acc') { acc += v; i++; }
        else if (op === 'nop') i++;
        else if (op === 'jmp') i += v;
    }
    return acc;
};

const data = getSplittedDataFromFile(8).map(inst => inst.split(' '));

console.log(run(data));

timer.stop();
