const { getCharMatrixFromFile, timer } = require('../utilities');

timer.start();

const map = getCharMatrixFromFile(3);

const [w, h] = [map[0].length, map.length];

const move = (p) => [(p[0] + 3) % (w), p[1] + 1];

let count = 0;

for (let pos = [0, 0]; pos[1] < h; pos = move(pos)) {
    count += map[pos[1]][pos[0]] === '#';
}

console.log(count);

timer.stop();
