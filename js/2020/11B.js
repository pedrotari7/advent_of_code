const { getCharMatrixFromFile, timer, sum, deepCopy } = require('../utilities');

timer.start();

const count = (state) => sum(state.map(line => sum(line.map(l => l === '#'))));

const isSeat = (seat) => seat === 'L' || seat === '#';

const getOccupied = (state, x, y) => {
    let occupied = 0;

    let seat;

    for (let s = 1; x - s >= 0; s++) {
        seat = state[x - s][y];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    for (let s = 1; x + s < Xmax; s++) {
        seat = state[x + s][y];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    for (let s = 1; y - s >= 0; s++) {
        seat = state[x][y - s];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }


    for (let s = 1; y + s < Ymax; s++) {
        seat = state[x][y + s];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    for (let s = 1; x - s >= 0 && y - s >= 0; s++) {
        seat = state[x - s][y - s];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    for (let s = 1; x - s >= 0 && y + s < Ymax; s++) {
        seat = state[x - s][y + s];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    for (let s = 1; x + s < Xmax && y + s < Ymax; s++) {
        seat = state[x + s][y + s];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    for (let s = 1; x + s < Xmax && y - s >= 0; s++) {
        seat = state[x + s][y - s];
        occupied += seat === '#';
        if (isSeat(seat)) break;
    }

    return occupied;
}

const run = (state) => {
    const newState = deepCopy(state);
    let changed = false;

    for (let j = 0; j < state.length; j++) {
        for (let i = 0; i < state[0].length; i++) {
            if (state[j][i] === 'L' && getOccupied(state, j, i) === 0) {
                changed = true;
                newState[j][i] = '#';
            } else if (state[j][i] === '#' && getOccupied(state, j, i) >= 5) {
                changed = true;
                newState[j][i] = 'L';
            }
        }
    }
    return { state: newState, changed };
}

let data = getCharMatrixFromFile(11, '');

const Xmax = data.length;
const Ymax = data[0].length;

let changed = true;

while (changed) {
    const s = run(data);
    changed = s.changed;
    data = s.state
}

console.log(count(data))

timer.stop();