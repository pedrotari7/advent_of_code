const { getCharMatrixFromFile, timer, sum, deepCopy } = require('../utilities');

timer.start();

const count = (state) => sum(state.map(line => sum(line.map(l => l === '#'))));

const isSeat = (seat) => seat === 'L' || seat === '#';

const inRange = (x, y) => x >= 0 && x < Xmax && y >= 0 && y < Ymax;

const getOccupied = (state, x, y) => {
    let occupied = 0;

    for (let dx of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
            if (dx == 0 && dy === 0) continue;
            let xx = x + dx, yy = y + dy;
            while (inRange(xx, yy) && !isSeat(state[xx][yy])) {
                xx += dx;
                yy += dy;
            }
            if (inRange(xx, yy)) occupied += state[xx][yy] === '#';
        }
    }
    return occupied;
}

const run = (state) => {
    const newState = deepCopy(state);
    let changed = false;

    for (let j = 0; j < Xmax; j++) {
        for (let i = 0; i < Ymax; i++) {
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