const { timer, getCharMatrixFromFile, int, sum, product, zip, repeat } = require('../utilities');

timer.start();

const toIDX = coord => coord.join(',');
const fromIDX = (idx) => idx.split(',').map(int);

const getNeighb = function* (coord) {
    const dir = [-1, 0, 1];
    for (const n of product(...repeat(dir, coord.length))) {
        if (!n.every(d => d === 0)) {
            yield zip(coord, n).map(sum);
        }
    }
}

const active = new Set();

const data = getCharMatrixFromFile(17, '');

for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        if (data[y][x] === '#') active.add(toIDX([x, y, 0, 0]));
    }
}

for (let cycle = 0; cycle < 6; cycle++) {
    const state = {};
    for (const cube of active) {
        for (const neigh of getNeighb(fromIDX(cube))) {
            state[neigh] = state[neigh] ? state[neigh] + 1 : 1;
        }
    }

    for (const [cube, amount] of Object.entries(state)) {
        if (active.has(cube)) {
            if (![2, 3].includes(amount)) {
                active.delete(cube)
            }
        } else if (amount === 3) {
            active.add(cube)
        }
    }
}

console.log(active.size)

timer.stop();

