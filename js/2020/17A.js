const { timer, getCharMatrixFromFile, int, min, max, sum, range, product, zip, repeat } = require('../utilities');

timer.start();

const print = (act) => {
    const state = [...act].map(fromIDX).reduce((s, v) => {
        if (s[v[2]]) s[v[2]].push(v.slice(0, 2));
        else s[v[2]] = [v.slice(0, 2)];
        return s;
    }, {});
    for (const z of Object.keys(state).sort()) {
        const xarr = state[z].map(a => a[0]);
        const yarr = state[z].map(a => a[1]);

        const [xmin, xmax, ymin, ymax] = [min(xarr), max(xarr), min(yarr), max(yarr)];
        console.log(`z=${z}`);
        for (const y of range(ymin - 1, ymax + 2)) {
            for (const x of range(xmin - 1, xmax + 2)) {
                if (act.has(toIDX([x, y, z]))) {
                    process.stdout.write('#')
                } else {
                    process.stdout.write('.')
                }
            }
            process.stdout.write('\n')
        }
        process.stdout.write('\n')

    }
}

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
        if (data[x][y] === '#') active.add(toIDX([x, y, 0]));
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

