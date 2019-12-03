const { getSplittedDataFromFile, sum } = require('../utilities');

const data = getSplittedDataFromFile(3, '\n').map(wire => wire.split(',').map(line => [line[0], +line.slice(1)]));

const moves = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] };

const move = dir => {
  x += moves[dir][0];
  y += moves[dir][1];
};

const travel = (dir, dist, id) => {
  for (let i = 0; i < dist; i++) {
    move(dir);
    steps += 1;
    visit(x, y, id);
  }
};

const visit = (x, y) => {
  key = [x, y].toString();
  if (key in grid) {
    if (!grid[key].c.map(e => e.id).includes(id)) {
      grid[key].c.push({ id, steps });
    }
  } else {
    grid[key] = { c: [{ id, steps }], x, y };
  }
};

const grid = {};

let id = -1;
let x = (y = steps = 0);

data.forEach(wire => {
  id += 1;
  x = y = steps = 0;
  wire.forEach(([dir, dist]) => travel(dir, dist, id));
});

let result = 2 ** 32;
for (let key in grid) {
  if (grid[key].c.length > 1) {
    result = Math.min(result, sum(grid[key].c.map(e => e.steps)));
  }
}

console.log(result);
