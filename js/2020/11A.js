const { getCharMatrixFromFile, timer, sum, deepCopy } = require('../utilities');

timer.start();

const count = (state) => sum(state.map(line => sum(line.map(l => l === '#'))));

const getOccupied = (state, x, y) =>
    ((x - 1 >= 0) && state[x - 1][y] === '#') +
    ((x - 1 >= 0 && y - 1 >= 0) && state[x - 1][y - 1] === '#') +
    ((x - 1 >= 0 && y + 1 < Ymax) && state[x - 1][y + 1] === '#') +
    ((x + 1 < Xmax) && state[x + 1][y] === '#') +
    ((x + 1 < Xmax && y - 1 >= 0) && state[x + 1][y - 1] === '#') +
    ((x + 1 < Xmax && y + 1 < Ymax) && state[x + 1][y + 1] === '#') +
    ((y - 1 >= 0) && state[x][y - 1] === '#') +
    ((y + 1 < Ymax) && state[x][y + 1] === '#');

const run = (state) => {
    const newState = deepCopy(state);
    let changed = false;

    for (let j = 0; j < state.length; j++) {
        for (let i = 0; i < state[0].length; i++) {
            if (state[j][i] === 'L' && getOccupied(state, j, i) === 0) {
                changed = true;
                newState[j][i] = '#';
            } else if (state[j][i] === '#' && getOccupied(state, j, i) >= 4) {
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