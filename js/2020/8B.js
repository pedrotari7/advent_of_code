const { getSplittedDataFromFile, timer, int, deepCopy } = require('../utilities');

timer.start();

run = (d) => {
    let i = 0, acc = 0;
    const hist = new Set();

    while (!hist.has(i) && i < d.length) {
        hist.add(i);
        const [op, v] = [d[i][0], int(d[i][1])];
        if (op === 'acc') { acc += v; i++; }
        else if (op === 'nop') i++;
        else if (op === 'jmp') i += v;
    }
    return i >= d.length ? acc : null;
};

const data = getSplittedDataFromFile(8).map(inst => inst.split(' '));

for (let idx = 0; idx < data.length; idx++) {

    if (data[idx][0] === 'jmp' || data[idx][0] === 'nop') {
        const copy = deepCopy(data);

        copy[idx][0] = copy[idx][0] === 'jmp' ? 'nop' : 'jmp';

        const result = run(copy);

        if (result) {
            console.log(result);
            break;
        }
    }

}

timer.stop();
