const { getSplittedDataFromFile, timer, zip, sum, range, int } = require('../utilities');

timer.start();

const toIDX = coord => coord.join(',');
const fromIDX = (idx) => idx.split(',').map(int);

const moves = { e: [1, -1, 0], ne: [1, 0, -1], nw: [0, 1, -1], se: [0, -1, 1], sw: [-1, 0, 1], w: [-1, 1, 0] }

const getNeigh = tile => Object.values(moves).map(m => toIDX(zip(m, fromIDX(tile)).map(sum)));

const goTo = (pos, move) => zip(pos, moves[move]).map(sum);

const initialTiles = d => {
    const active = new Set();

    const insts = d.map(line => {
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
    })

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
    return active;
}

const data = getSplittedDataFromFile(24);

let active = initialTiles(data);

for (const _ in range(0, 100)) {
    const newActive = new Set();

    const tiles = new Set([...active].map(act => [act, ...getNeigh(act)]).flat());

    for (const tile of tiles) {
        const neighs = sum(getNeigh(tile).map(t => active.has(t)));

        if (active.has(tile)) {
            if (neighs === 1 || neighs === 2) newActive.add(tile);
        } else {
            if (neighs === 2) newActive.add(tile);
        }
    }

    active = new Set([...newActive]);
}
console.log(active.size);

timer.stop();