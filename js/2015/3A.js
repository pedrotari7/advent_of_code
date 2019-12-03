const { getSplittedDataFromFile } = require('../utilities');

const data = getSplittedDataFromFile(3, '');

const moves = { '^': [0, -1], '>': [1, 0], v: [0, 1], '<': [-1, 0] };

let pos = [0, 0];

const houses = new Map([[`[${pos[0]},${pos[1]}]`, 1]]);

const move = dir => {
  pos = [pos[0] + moves[dir][0], pos[1] + moves[dir][1]];
  return pos;
};

const visit = p => {
  p = `[${p[0]},${p[1]}]`;
  houses.has(p) ? houses.set(p, houses.get(p) + 1) : houses.set(p, 1);
};

data.forEach(dir => visit(move(dir)));

console.log(houses.size);
