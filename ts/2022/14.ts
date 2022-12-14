import { timer, getSplittedDataFromFile, int10, inRange } from '../utilities.ts';

timer.start();

const rocks = getSplittedDataFromFile(14).map(r => r.split(' -> ').map(c => c.split(',').map(int10)));

const limits = rocks.reduce(
  (ls, line) => {
    for (const [x, y] of line) {
      ls.xmax = Math.max(ls.xmax, x);
      ls.xmin = Math.min(ls.xmin, x);
      ls.ymax = Math.max(ls.ymax, y);
    }
    return ls;
  },
  { xmin: Infinity, xmax: -Infinity, ymin: 0, ymax: -Infinity }
);

const cave = new Set();
const drop = [500, 0];

for (const [i, rock] of rocks.entries()) {
  for (let j = 0; j < rock.length - 1; j++) {
    const [start, end] = [rocks[i][j], rocks[i][j + 1]];
    if (start[0] === end[0]) {
      for (let k = start[1]; k !== end[1]; k = k + Math.sign(end[1] - start[1])) {
        cave.add(String([end[0], k]));
      }
      cave.add(String(end));
    } else {
      for (let k = start[0]; k !== end[0]; k = k + Math.sign(end[0] - start[0])) {
        cave.add(String([k, end[1]]));
      }
      cave.add(String(end));
    }
  }
}

let count = 0;
let p1;

let cur = [...drop];

const inBounds = (x: number, y: number) => inRange(x, limits.xmin, limits.xmax) && inRange(y, limits.ymin, limits.ymax);

const isBlocked = (x: number, y: number) => cave.has(String([x, y])) || y === limits.ymax + 2;

while (!(cur[0] === drop[0] && cur[1] === drop[1] && isBlocked(cur[0], cur[1]))) {
  if (!p1 && !(inBounds(cur[0], cur[1] + 1) || inBounds(cur[0] - 1, cur[1] + 1) || inBounds(cur[0] + 1, cur[1] + 1))) {
    p1 = count;
  }

  if (!isBlocked(cur[0], cur[1] + 1)) {
    cur = [cur[0], cur[1] + 1];
  } else if (!isBlocked(cur[0] - 1, cur[1] + 1)) {
    cur = [cur[0] - 1, cur[1] + 1];
  } else if (!isBlocked(cur[0] + 1, cur[1] + 1)) {
    cur = [cur[0] + 1, cur[1] + 1];
  } else {
    cave.add(String(cur));
    count += 1;
    cur = [...drop];
  }
}

console.log('p1', p1);
console.log('p2', count);

timer.stop();
