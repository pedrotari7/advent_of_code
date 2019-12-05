const { getSplittedDataFromFile, manhattanOrigin } = require('../utilities');

const data = getSplittedDataFromFile(3, '\n').map(wire => wire.split(',').map(line => [ line[0], Number(line.slice(1)) ]));

const moves = { U: [ 0, -1 ], D: [ 0, 1 ], L: [ -1, 0 ], R: [ 1, 0 ] };

const grid = {};
let x = 0, y = 0;
id = -1;

const move = dir => {
  x += moves[dir][0];
  y += moves[dir][1];
};

const visit = (x, y) => {
  key = [ x, y ].toString();
  if (key in grid) {
    if (!grid[key].c.includes(id)) {
      grid[key].c.push(id);
    }
  } else {
    grid[key] = { c: [ id ], x: x, y: y };
  }
};

const travel = (dir, dist) => {
  for (let i = 0; i < dist; i++) {
    move(dir);
    visit(x, y, id);
  }
};


data.forEach(wire => {
  x = y = 0;
  id += 1;
  wire.forEach(([ dir, dist ]) => travel(dir, dist, id));
});

let result = Math.pow(2, 32);
for (let key in grid) {
  if (grid[key].c.length > 1) {
    result = Math.min(result, manhattanOrigin(grid[key].x, grid[key].y));
  }
}

console.log(result);
