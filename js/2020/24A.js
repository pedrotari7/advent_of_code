const { getSplittedDataFromFile, timer, zip, sum } = require('../utilities');

timer.start();

const toIDX = coord => coord.join(',');

const moves = { e: [1, -1, 0], ne: [1, 0, -1], nw: [0, 1, -1], se: [0, -1, 1], sw: [-1, 0, 1], w: [-1, 1, 0] }

const goTo = (pos, move) => zip(pos, moves[move]).map(sum);

const data = getSplittedDataFromFile(24);

const active = new Set();

const insts = data.map(line => {
    const inst = [];
    for (let i = 0; i < line.length; i++) {
        if (['s', 'n'].includes(line[i])) {
            inst.push([line[i], line[i + 1]].join(''));
            i++;
        } else {
            inst.push(line[i])
        }
    }
    return inst;
});

for (const inst of insts) {
    let pos = [0, 0, 0];
    for (const move of inst) {
        pos = goTo(pos, move);
    }
    const idx = toIDX(pos);
    if (active.has(idx)) {
        active.delete(idx);
    } else {
        active.add(idx);
    }
}

console.log(active.size);

timer.stop();
