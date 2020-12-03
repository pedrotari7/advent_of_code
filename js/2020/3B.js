const { getCharMatrixFromFile, timer, mult } = require('../utilities');

timer.start();

const map = getCharMatrixFromFile(3);

const [w, h] = [map[0].length, map.length];

const move = (p, d) => [(p[0] + d[0]) % w, p[1] + d[1]];

const trees = dir => {
    let treeCount = 0;
    for (let pos = [0, 0]; pos[1] < map.length; pos = move(pos, dir)) {
        treeCount += map[pos[1]][pos[0]] === '#';
    }
    return treeCount;
}

console.log(mult([[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].map(trees)))

timer.stop();
