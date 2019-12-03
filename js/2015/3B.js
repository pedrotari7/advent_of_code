const { getSplittedDataFromFile } = require('../utilities');

const data = getSplittedDataFromFile(3, '');

const moves = { '^': [0, -1], '>': [1, 0], v: [0, 1], '<': [-1, 0] };

let posA = [0, 0];
let posB = [0, 0];

let turn = true;

const houses = new Map([['[0,0]', 1]]);

const move = dir => {
  const pos = turn ? posA : posB;
  const new_pos = [pos[0] + moves[dir][0], pos[1] + moves[dir][1]];

  posA = turn ? new_pos : posA;
  posB = turn ? posB : new_pos;

  return new_pos;
};

const visit = p => {
  p = `[${p[0]},${p[1]}]`;
  houses.has(p) ? houses.set(p, houses.get(p) + 1) : houses.set(p, 1);
  turn = !turn;
};

data.forEach(dir => visit(move(dir)));

console.log(houses.size);
