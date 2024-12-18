import { addArrays } from '../utilities.ts';
import { dirs_no_diag } from '../utilities.ts';
import { MapS } from '../utilities.ts';
import { timer, getIntMatrixFromFile, SetS, inRange } from '../utilities.ts';

timer.start();

type Point = number[];

const bytes = getIntMatrixFromFile(18, ',').reduce(
  (acc, [X, Y], i) => acc.set([Y, X], i + 1),
  new MapS<Point, number>()
);

const isBlocked = (pos: Point, s: number) => bytes.has(pos) && bytes.get(pos)! <= s;

const debug = false;

const [Y, X] = [debug ? 6 : 70, debug ? 6 : 70];

const n = debug ? 12 : 1024;

const print = (s: number, path: Point[]) => {
  const grid = Array.from({ length: Y + 1 }, () => Array.from({ length: X + 1 }, () => '.'));

  for (const [y, x] of [...bytes.keys()]) {
    if (isBlocked([y, x], s)) {
      grid[y][x] = '#';
    }
  }
  for (const [y, x] of path) {
    grid[y][x] = 'O';
  }
  // print grid
  for (const row of grid) {
    console.log(row.join(''));
  }
  console.log();
};

const run = (k: number) => {
  const seen = new SetS<Point>();

  const Q = [{ pos: [0, 0], seconds: 0, path: [[0, 0]] as Point[] }];

  while (Q.length > 0) {
    const { pos, seconds, path } = Q.shift()!;

    if (pos[0] === Y && pos[1] === X) {
      return path.length - 1;
    }

    for (const [dx, dy] of Object.values(dirs_no_diag)) {
      const next = addArrays(pos, [dy, dx]);
      if (!seen.has(next) && inRange(next[0], 0, Y) && inRange(next[1], 0, X) && !isBlocked(next, k)) {
        seen.add(next);
        Q.push({
          pos: next,
          seconds: seconds + 1,
          path: [...path, next],
        });
      }
    }
  }

  return -1;
};

console.log('p1', run(n));

let low = n;
let high = bytes.size;

while (low < high) {
  const mid = Math.floor((low + high) / 2);
  if (run(mid) === -1) {
    high = mid;
  } else {
    low = mid + 1;
  }
}

console.log(
  'p2',
  [...bytes.entries()]
    .filter(([_, v]) => v === low)
    .map(([coord]) => JSON.parse(coord).reverse())
    .pop()
    .toString()
);

timer.stop();
